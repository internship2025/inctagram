import { Notification } from "./Notification";
import * as React from "react";
import { ScrollArea } from "radix-ui";
import styles from "./Notifications.module.css";
import { Params } from "@/features/notifications/api/types";
import {
  notificationsApi,
  useDeletedNotificationMutation,
  useMarkIsReadMutation,
} from "@/features/notifications/api/notifications.api";
import { useAppDispatch } from "@/services/store";

type Notifications = {
  notifications:
    | Array<{
        id: number;
        message: string;
        isRead: boolean;
        createdAt: string;
        clientId?: string;
      }>
    | undefined;
  fetchNotifications: (params: Params) => void;
  hasMore: boolean;
};

export const Notifications = ({
  notifications,
  fetchNotifications,
  hasMore,
}: Notifications) => {
  const [del] = useDeletedNotificationMutation();
  const [markAsRead] = useMarkIsReadMutation();


     function deel(id: number) {
      del({ id });
    }
  

  const loaderRef = React.useRef<HTMLDivElement>(null);
  const observerRef = React.useRef<IntersectionObserver | null>(null);

  const viewportRef = React.useRef<HTMLDivElement>(null);
  const lastScrollTop = React.useRef(0);
  const dispatch = useAppDispatch();

  

  const updateNotificationCache = (ids: number[]) => {
    dispatch(
      notificationsApi.util.updateQueryData("getNotification", {}, (draft) => {
        if (draft) {
          draft.items.forEach((item) => {
            if (ids.includes(item.id)) {
              item.isRead = true;
            }
          });
        }
      })
    );
  };



  const handleObserver = React.useCallback(
    (entries: any) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasMore) {
        fetchNotifications({
          cursor: notifications?.[notifications?.length - 1].id,
        });
      }
    },
    [notifications]
  );

  function debounceBatch<T extends (ids: number[]) => void>(
    func: T,
    delay: number
  ) {
    let timeoutId: ReturnType<typeof setTimeout>;
    let pendingIds = new Set<number>();

    return function (ids: Array<number>) {
      ids.forEach((id) => pendingIds.add(id));
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(Array.from(pendingIds));
        pendingIds.clear();
      }, delay);
    };
  }

  React.useEffect(() => {
    if (loaderRef.current) {
      if (observerRef.current) observerRef.current.disconnect();
    }
    observerRef.current = new IntersectionObserver(handleObserver, {});
    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [notifications, handleObserver]);


      const debouncedMarkAsRead = React.useMemo(
    () =>
      debounceBatch((ids: number[]) => {
        updateNotificationCache(ids);
        markAsRead(ids)
          .unwrap()
          .then(() => {})
          .catch((er) => {
          });
      }, 500),
    [markAsRead, updateNotificationCache]
  );


  const handleScroll = React.useCallback(() => {
    if (!viewportRef.current || !notifications) return;
    const viewport = viewportRef.current;
    const scrollTop = viewport.scrollTop;
    const isScrollingDown = scrollTop > lastScrollTop.current;
    lastScrollTop.current = scrollTop;

    if (!isScrollingDown) return;

    const unreadNotifications = notifications.filter((n) => !n.isRead);
    if (unreadNotifications.length === 0) return;
    const visibleUnreadIds = new Set<number>();
    unreadNotifications.forEach((it) => {
      if (it.isRead) return;
      const element = document.getElementById(`notification-${it.id}`);
      if (element && isElementInViewport(element, viewportRef.current!)) {
        visibleUnreadIds.add(it.id);
      }
    });

    console.log(visibleUnreadIds);
    if (visibleUnreadIds.size > 0) {
      debouncedMarkAsRead(Array.from(visibleUnreadIds));
    }
  }, [notifications, debouncedMarkAsRead]);

  const isElementInViewport = (el: HTMLElement, viewport: HTMLElement) => {
    const elRect = el.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();

    return (
      elRect.top >= viewportRect.top &&
      elRect.left >= viewportRect.left &&
      elRect.bottom <= viewportRect.bottom &&
      elRect.right <= viewportRect.right
    );
  };

  React.useEffect(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);


  return (
    <ScrollArea.Root className={styles.Root}>
      <ScrollArea.Viewport className={styles.Viewport} ref={viewportRef}>
        <div className={styles.wrapperNotifications}>
          <div className={styles.Text}>Уведомления</div>
          {notifications?.map((it, index, array) => {
            let isLastElement = array.length - 1 === index;

            return (
              <Notification
                ref={isLastElement ? loaderRef : null}
                key={it.clientId ? it.clientId + it.id : it.id}
                messages={it}
                id={`notification-${it.id}`}
                deel={deel}
              />
            );
          })}
        </div>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar} orientation="vertical">
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Scrollbar
        className={styles.Scrollbar}
        orientation="horizontal"
      >
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
      <ScrollArea.Corner className={styles.Corner} />
    </ScrollArea.Root>
  );
};
