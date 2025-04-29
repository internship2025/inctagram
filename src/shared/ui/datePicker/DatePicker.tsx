"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  isToday,
} from "date-fns";
import s from "./datePicker.module.css";
import { CalendarIcon } from "./CalendarIcon";

type Page = {
  selectedDate: Date | [Date, Date] | null;
  onDateChange: (val: Date | [Date, Date] | string | [string, string]) => void;
  isRange?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string;
  error?: string;
};

export const DatePicker = ({
  selectedDate,
  onDateChange,
  label,
  fullWidth = false,
  isRange = false,
  disabled = false,
  error,
}: Page) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, seterrorMessage] = useState<React.ReactNode>("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isHoldingButton, setIsHoldingButton] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      stopContinuousNavigation();
      stopHoldNavigation();
    };
  }, []);

  const prevMonth = useCallback(() => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  }, []);

  const nextMonth = useCallback(() => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  }, []);

  const startContinuousNavigation = useCallback(
    (direction: "prev" | "next") => {
      const id = setInterval(() => {
        direction === "prev" ? prevMonth() : nextMonth();
      }, 20);
      setIntervalId(id);
    },
    [prevMonth, nextMonth],
  );

  const stopContinuousNavigation = useCallback(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [intervalId]);

  const startHoldNavigation = useCallback(
    (direction: "prev" | "next") => {
      direction === "prev" ? prevMonth() : nextMonth();
      holdTimerRef.current = setTimeout(() => {
        setIsHoldingButton(true);
        startContinuousNavigation(direction);
      }, 300);
    },
    [prevMonth, nextMonth, startContinuousNavigation],
  );

  const stopHoldNavigation = useCallback(() => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    setIsHoldingButton(false);
    stopContinuousNavigation();
  }, [stopContinuousNavigation]);

  const getDate = (date: Date | [Date, Date] | null) => {
    if (!date) return "";
    if (Array.isArray(date)) {
      return `${format(date[0], "dd/MM/yyyy")} - ${format(
        date[1],
        "dd/MM/yyyy",
      )}`;
    }
    return format(date, "dd/MM/yyyy");
  };

  const renderHeader = () => {
    return (
      <div className={s.header}>
        <span className={s.month}>{format(currentMonth, "MMMM yyyy")}</span>
        <div className={s.navigation}>
          <button
            type="button"
            className={`${s.circleButton} ${isHoldingButton ? s.holding : ""}`}
            onMouseDown={() => startHoldNavigation("prev")}
            onMouseUp={stopHoldNavigation}
            onMouseLeave={stopHoldNavigation}
            onTouchStart={() => startHoldNavigation("prev")}
            onTouchEnd={stopHoldNavigation}
            aria-label="Previous month"
          ></button>
          <button
            type="button"
            className={`${s.circleButton} ${isHoldingButton ? s.holding : ""}`}
            onMouseDown={() => startHoldNavigation("next")}
            onMouseUp={stopHoldNavigation}
            onMouseLeave={stopHoldNavigation}
            onTouchStart={() => startHoldNavigation("next")}
            onTouchEnd={stopHoldNavigation}
            aria-label="Next month"
          ></button>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEEEE";
    const days = [];
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className={s.dayName} key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      );
    }

    return <div className={s.daysRow}>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(addDays(startDate, 6 * 7 - 1), {
      weekStartsOn: 1,
    });
    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;

        const isSelected = isRange
          ? rangeStart &&
            rangeEnd &&
            cloneDay >= rangeStart &&
            cloneDay <= rangeEnd
          : isSameDay(day, selectedDate as Date);

        const isCurrentMonth = isSameMonth(day, monthStart);
        const isWeekend =
          isCurrentMonth &&
          (cloneDay.getDay() === 0 || cloneDay.getDay() === 6);

        let str = false;
        let end = false;

        if (rangeStart) {
          if (!errorMessage) {
            str =
              rangeStart.getMonth() === day.getMonth() &&
              rangeStart.getDate() === day.getDate();
            if (rangeStart && rangeEnd) {
              if (
                rangeStart.getDate() === rangeEnd.getDate() &&
                rangeStart.getMonth() === rangeEnd.getMonth()
              ) {
                setRangeEnd(null);
                str = false;
                end = false;
              }
            }
          } else {
            setRangeStart(null);
            str = false;
            end = false;
          }
        }

        if (rangeEnd) {
          end =
            rangeEnd.getMonth() === day.getMonth() &&
            rangeEnd.getDate() === day.getDate();
        }

        const isInHoverRange =
          isRange &&
          rangeStart &&
          !rangeEnd &&
          hoveredDate &&
          ((cloneDay > rangeStart && cloneDay < hoveredDate) ||
            (cloneDay > hoveredDate && cloneDay < rangeStart));

        const isInFixedRange =
          isRange &&
          rangeStart &&
          rangeEnd &&
          cloneDay > rangeStart &&
          cloneDay < rangeEnd;

        const isHovered = hoveredDate && isSameDay(cloneDay, hoveredDate);

        days.push(
          <div
            className={`${s.day} ${
              !isSameMonth(day, monthStart)
                ? s.otherMonth
                : isRange && isToday(day) && (str || end)
                  ? `${s.selectedRange} ${s.tods}`
                  : isRange && isToday(day)
                    ? s.today
                    : isToday(day) && isSelected
                      ? s.act
                      : isToday(day)
                        ? s.today
                        : isRange && isWeekend && isSelected
                          ? `${s.weekend} ${s.selectedRange}`
                          : isWeekend && isSelected
                            ? s.weekend
                            : isWeekend
                              ? s.weekend
                              : isSelected && isRange
                                ? s.selectedRange
                                : isSelected
                                  ? s.selected
                                  : ""
            } ${str ? s.one : ""} ${end ? s.two : ""} ${
              isInHoverRange || isInFixedRange ? s.inRange : ""
            } ${isHovered ? s.hovered : ""}`}
            key={day.getTime()}
            onClick={() => handleDateClick(cloneDay)}
            onMouseEnter={() => setHoveredDate(cloneDay)}
            onMouseLeave={() => setHoveredDate(null)}
          >
            {format(day, dateFormat)}
          </div>,
        );

        day = addDays(day, 1);
      }
      rows.push(
        <div className={s.row} key={day.getTime()}>
          {days}
        </div>,
      );
      days = [];
    }

    return <div className={s.body}>{rows}</div>;
  };

  const handleDateClick = (date: Date) => {
    const utcDate = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
    );

    seterrorMessage("");

    if (isRange) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
      } else if (rangeStart && !rangeEnd) {
        const utcRangeStart = new Date(
          Date.UTC(
            rangeStart.getFullYear(),
            rangeStart.getMonth(),
            rangeStart.getDate(),
          ),
        );

        if (date > rangeStart) {
          setRangeEnd(date);
          onDateChange([utcRangeStart.toISOString(), utcDate.toISOString()]);
        } else {
          setRangeEnd(rangeStart);
          setRangeStart(date);
          onDateChange([utcDate.toISOString(), utcRangeStart.toISOString()]);
        }
      }
    } else {
      onDateChange(utcDate.toISOString());
    }

    setIsOpen(false);
  };

  return (
    <div
      className={`${s.inp} ${fullWidth ? s.fullWidth : ""}`}
      ref={containerRef}
    >
      {label && (
        <label className={s.label} htmlFor="inputDate">
          {label}
        </label>
      )}
      <div className={s.inputWrapper}>
        <input
          id={"inputDate"}
          ref={inputRef}
          placeholder="00.00.0000"
          className={`${s.input} ${isOpen ? s.active : ""} ${
            disabled ? s.disabled : ""
          } ${isRange ? s.range : ""} ${errorMessage && s.errorMessage}  ${error && s.errorMessage}`}
          onChange={() => {}}
          value={getDate(selectedDate)}
          type="text"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(!isOpen);
            if (isFocused && !isOpen) {
              inputRef.current?.blur();
            }
          }}
          onFocus={() => {
            setIsFocused(true);
            if (!isOpen) {
              inputRef.current?.blur();
            }
          }}
          onBlur={() => {
            if (isOpen) {
              setIsFocused(true);
            }
          }}
        />
        <span
          onClick={() => {
            if (!disabled) {
              setIsOpen(!isOpen);
            }
          }}
          className={s.wrapperIcon}
        >
          <CalendarIcon error={error} className={s.icon} />
        </span>
      </div>

      {/* {errorMessage && !isOpen ? <div className={s.errorMessageText}>{errorMessage}</div> : ""} */}
      {isOpen && (
        <div className={s.datePicker} onMouseLeave={() => setHoveredDate(null)}>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
      )}
    </div>
  );
};
