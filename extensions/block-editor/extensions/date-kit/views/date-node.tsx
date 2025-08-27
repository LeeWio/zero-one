import { useState } from "react";
import { TDateElement } from "platejs";
import { PlateElement, PlateElementProps, useReadOnly } from "platejs/react";
import { cn } from "@heroui/theme";
import { DatePicker } from "@heroui/date-picker";
import {
  parseDate,
  getLocalTimeZone,
  parseAbsolute,
} from "@internationalized/date";
import { useDateFormatter } from "@react-aria/i18n";
import type { DateValue } from "@internationalized/date";

export function DateElement(props: PlateElementProps<TDateElement>) {
  const { editor, element } = props;

  console.log(element.date);

  let formatter = useDateFormatter({ dateStyle: "full" });

  let value = null;
  if (element.date) {
    try {
      // 尝试直接解析 ISO 日期
      value = parseDate(element.date);
    } catch {
      // 如果不是 ISO，先转成 Date 再转 ISO，然后解析成 ZonedDateTime
      const isoString = new Date(element.date).toISOString();
      value = parseAbsolute(isoString, getLocalTimeZone());
    }
  }

  const readOnly = useReadOnly();

  // const trigger = (
  //   <span
  //     className={cn(
  //       "w-fit cursor-pointer rounded-sm bg-muted px-1 text-muted-foreground",
  //     )}
  //     contentEditable={false}
  //     draggable
  //   >
  //     {element.date ? (
  //       (() => {
  //         const today = new Date();
  //         const elementDate = new Date(element.date);
  //         const isToday =
  //           elementDate.getDate() === today.getDate() &&
  //           elementDate.getMonth() === today.getMonth() &&
  //           elementDate.getFullYear() === today.getFullYear();
  //
  //         const isYesterday =
  //           new Date(today.setDate(today.getDate() - 1)).toDateString() ===
  //           elementDate.toDateString();
  //         const isTomorrow =
  //           new Date(today.setDate(today.getDate() + 2)).toDateString() ===
  //           elementDate.toDateString();
  //
  //         if (isToday) return "Today";
  //         if (isYesterday) return "Yesterday";
  //         if (isTomorrow) return "Tomorrow";
  //
  //         return elementDate.toLocaleDateString(undefined, {
  //           day: "numeric",
  //           month: "long",
  //           year: "numeric",
  //         });
  //       })()
  //     ) : (
  //       <span>Pick a date</span>
  //     )}
  //   </span>
  // );

  return (
    <PlateElement
      {...props}
      className="inline-block"
      attributes={{
        ...props.attributes,
        contentEditable: false,
      }}
    >
      <DatePicker
        hideTimeZone
        isReadOnly={readOnly}
        size="sm"
        value={value}
        className="max-w-[284px] !py-0"
        onChange={(value) => {
          if (!value) {
            return;
          }
          const dateStr = value.toDate(getLocalTimeZone()).toDateString();
          console.log(dateStr);
          editor.tf.setNodes(
            {
              date: dateStr,
            },
            { at: element },
          );
        }}
      />
    </PlateElement>
  );
}
