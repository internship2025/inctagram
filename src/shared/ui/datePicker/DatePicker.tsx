"use client";

import React, { useEffect, useRef, useState } from "react";
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
  onDateChange: (val: Date | [Date, Date]) => void;
  isRange?: boolean;
  disabled?: boolean;
};

export const CustomDatePicker = ({
  selectedDate,
  onDateChange,
  isRange = false,
  disabled = false,
}: Page) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [error, isError] = useState("");
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

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
    };
  }, []);

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

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const renderHeader = () => {
    return (
      <div className={s.header}>
        <span className={s.month}>{format(currentMonth, "MMMM yyyy")}</span>
        <div className={s.navigation}>
          <button className={s.circleButton} onClick={prevMonth}></button>
          <button className={s.circleButton} onClick={nextMonth}></button>
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

        const date = day.getMonth() >= new Date().getMonth();

        let str = false;
        let end = false;

        if (rangeStart) {
          if (!error) {
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
                              : isToday(day) && isSelected
                                ? s.oneSel
                                : isToday(day)
                                  ? s.today
                                  : isSelected && isRange
                                    ? s.selectedRange
                                    : isSelected
                                      ? s.selected
                                      : ""
            }  ${date && isSelected ? s.mix : ""} ${str ? s.one : ""} ${
              end ? s.two : ""
            } ${isInHoverRange || isInFixedRange ? s.inRange : ""} ${
              isHovered ? s.hovered : ""
            } ${
              !isSameMonth(day, monthStart) && isSelected && isRange
                ? s.selectedRange
                : ""
            } 
            ${
              !isSameMonth(day, monthStart) && isSelected && isRange && end
                ? ""
                : ""
            }
            `}
            key={day.getTime()}
            onClick={() => handleDateClick(cloneDay)}
            onMouseEnter={() => setHoveredDate(cloneDay)}
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
    let isPastMonth = false;
    if (date.getMonth() === new Date().getMonth()) {
      if (date.getDate() >= new Date().getDate()) {
        isPastMonth = true;
      }
    } else if (date.getMonth() > new Date().getMonth()) {
      isPastMonth = true;
    }

    if (!isPastMonth) {
      isError("Error!");
      setIsOpen(false);
      setRangeStart(null);
      setRangeEnd(null);
    } else {
      isError("");
    }

    if (isRange) {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        // Если диапазон не начат или завершен, начинаем новый диапазон
        setRangeStart(date);
        setRangeEnd(null);
      } else if (rangeStart && !rangeEnd) {
        // Если выбрана вторая дата, завершаем диапазон
        if (date > rangeStart) {
          setRangeEnd(date);
          onDateChange([rangeStart, date]);
        } else {
          // Если вторая дата меньше первой, меняем их местами
          setRangeEnd(rangeStart);
          setRangeStart(date);
          onDateChange([date, rangeStart]);
        }
      }
    } else {
      // Если не диапазон, просто выбираем дату
      onDateChange(date);
    }
  };

  return (
    <div className={s.inp} ref={containerRef}>
      <input
        ref={inputRef}
        className={`${s.input} ${isOpen ? s.active : ""} ${error ? s.error : ""} ${
          disabled ? s.disabled : ""
        } ${isRange ? s.range : ""}`}
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
      {error && !isOpen ? <div className={s.errorText}>{error}</div> : ""}
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
