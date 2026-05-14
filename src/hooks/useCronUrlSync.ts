"use client";

import { useEffect, useRef } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { useCronStore } from "@/stores/cronStore";

export function useCronUrlSync() {
  const [params, setParams] = useQueryStates({
    m: parseAsString.withDefault("*"),
    h: parseAsString.withDefault("*"),
    dom: parseAsString.withDefault("*"),
    mon: parseAsString.withDefault("*"),
    dow: parseAsString.withDefault("*"),
  });

  const fields = useCronStore((s) => s.fields);
  const setAll = useCronStore((s) => s.setAll);

  // Hydrate once on mount from URL.
  const hydrated = useRef(false);
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    setAll({
      minute: params.m,
      hour: params.h,
      dayOfMonth: params.dom,
      month: params.mon,
      dayOfWeek: params.dow,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Push store -> URL whenever fields change (after hydration).
  useEffect(() => {
    if (!hydrated.current) return;
    setParams(
      {
        m: fields.minute,
        h: fields.hour,
        dom: fields.dayOfMonth,
        mon: fields.month,
        dow: fields.dayOfWeek,
      },
      { history: "replace" },
    );
  }, [fields, setParams]);
}
