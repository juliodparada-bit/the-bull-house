"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  parse,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { es } from "date-fns/locale";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import { services, formatPrice, getServiceBySlug } from "@/data/services";
import { professionals } from "@/data/professionals";
import { cn } from "@/lib/cn";

type Step = 1 | 2 | 3 | 4;

const MAX_MONTHS_AHEAD = 6;

export function BookingWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselected = searchParams.get("servicio");

  const today = useMemo(() => startOfDay(new Date()), []);
  const maxMonth = useMemo(
    () => startOfMonth(addMonths(today, MAX_MONTHS_AHEAD)),
    [today],
  );

  const [step, setStep] = useState<Step>(1);
  const [serviceSlugs, setServiceSlugs] = useState<string[]>([]);
  const [professionalId, setProfessionalId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(new Date()));
  const [categoryFilter, setCategoryFilter] = useState<
    "all" | "individuales" | "combos"
  >("all");

  const selectedServices = useMemo(
    () =>
      serviceSlugs
        .map((slug) => getServiceBySlug(slug))
        .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    [serviceSlugs],
  );

  const totalPrice = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.price, 0),
    [selectedServices],
  );

  const totalDuration = useMemo(
    () => selectedServices.reduce((sum, s) => sum + s.durationMin, 0),
    [selectedServices],
  );

  const filteredServices = useMemo(() => {
    if (categoryFilter === "all") return services;
    return services.filter((s) => s.category === categoryFilter);
  }, [categoryFilter]);

  const selectedDateObj = useMemo(
    () => (date ? parse(date, "yyyy-MM-dd", new Date()) : null),
    [date],
  );

  const selectedParts = useMemo(() => {
    if (!selectedDateObj) {
      return { day: "DÍA", month: "MES", year: "AÑO" };
    }
    return {
      day: format(selectedDateObj, "d"),
      month: format(selectedDateObj, "MMM", { locale: es }).toUpperCase(),
      year: format(selectedDateObj, "yyyy"),
    };
  }, [selectedDateObj]);

  const calendarDays = useMemo(() => {
    const start = startOfMonth(viewMonth);
    const end = endOfMonth(viewMonth);
    return eachDayOfInterval({ start, end });
  }, [viewMonth]);

  const canGoPrevMonth = isBefore(startOfMonth(today), viewMonth);
  const canGoNextMonth = isBefore(viewMonth, maxMonth);

  useEffect(() => {
    if (preselected && getServiceBySlug(preselected)) {
      setServiceSlugs([preselected]);
    }
  }, [preselected]);

  useEffect(() => {
    if (!professionalId || !date || totalDuration <= 0) {
      setSlots([]);
      return;
    }
    let cancelled = false;
    setLoadingSlots(true);
    setTime("");
    fetch(
      `/api/disponibilidad?professionalId=${professionalId}&date=${date}&durationMin=${totalDuration}`,
    )
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setSlots(data.slots || []);
      })
      .catch(() => {
        if (!cancelled) setSlots([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingSlots(false);
      });
    return () => {
      cancelled = true;
    };
  }, [professionalId, date, totalDuration]);

  function toggleService(slug: string) {
    setServiceSlugs((current) =>
      current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug],
    );
  }

  function removeService(slug: string) {
    setServiceSlugs((current) => current.filter((s) => s !== slug));
  }

  function canContinue() {
    if (step === 1) return serviceSlugs.length > 0;
    if (step === 2) return Boolean(professionalId);
    if (step === 3) return Boolean(date && time);
    if (step === 4)
      return name.trim().length > 2 && phone.replace(/\D/g, "").length >= 10;
    return false;
  }

  async function submit() {
    if (selectedServices.length === 0) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceSlugs,
          professionalId,
          date,
          time,
          customerName: name.trim(),
          customerPhone: phone.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        router.push(
          `/reservas/error?reason=${encodeURIComponent(data.error || "No se pudo crear la reserva")}`,
        );
        return;
      }
      router.push(
        `/reservas/exito?id=${encodeURIComponent(data.booking.id)}&wa=${encodeURIComponent(data.whatsappUrl)}`,
      );
    } catch {
      router.push("/reservas/error?reason=Error%20de%20conexión");
    } finally {
      setSubmitting(false);
    }
  }

  const stepLabel =
    step === 1
      ? "ELIGE TUS SERVICIOS:"
      : step === 2
        ? "ELIGE TU PROFESIONAL:"
        : step === 3
          ? "ELIGE LA FECHA:"
          : "REGISTRO:";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function goToStep(next: Step) {
    setStep(next);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:px-6">
      <div className="mb-6 text-center">
        <span className="pill-label">{stepLabel}</span>
        {step === 1 ? (
          <p className="mt-3 text-xs text-muted">
            Puedes seleccionar uno o varios servicios
          </p>
        ) : null}
      </div>

      {selectedServices.length > 0 && step === 1 ? (
        <div className="mb-5 rounded-2xl border border-brown/20 bg-white p-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brown">
              Seleccionados ({selectedServices.length})
            </p>
            <p className="text-sm font-semibold text-brown-deep">
              {formatPrice(totalPrice)} · {totalDuration} min
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedServices.map((s) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => removeService(s.slug)}
                className="inline-flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-xs font-semibold text-brown-deep"
              >
                {s.name}
                <X size={12} />
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="panel-box !rounded-[1.5rem] !p-5 md:!p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <div>
                <div className="mb-5 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setCategoryFilter("individuales")}
                    className={cn(
                      "btn-brown !rounded-lg",
                      categoryFilter === "individuales" && "ring-2 ring-cream",
                    )}
                  >
                    Barbería
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategoryFilter("combos")}
                    className={cn(
                      "btn-brown !rounded-lg",
                      categoryFilter === "combos" && "ring-2 ring-cream",
                    )}
                  >
                    Paquetes barbería
                  </button>
                  <button
                    type="button"
                    onClick={() => setCategoryFilter("all")}
                    className="btn-cream"
                  >
                    Ver todos
                  </button>
                </div>
                <div className="grid max-h-[26rem] gap-3 overflow-y-auto sm:grid-cols-2">
                  {filteredServices.map((s) => {
                    const selected = serviceSlugs.includes(s.slug);
                    return (
                      <button
                        key={s.slug}
                        type="button"
                        onClick={() => toggleService(s.slug)}
                        className={cn(
                          "relative rounded-xl border-2 bg-cream p-4 text-left transition",
                          selected
                            ? "border-brown shadow-md"
                            : "border-transparent hover:border-brown/30",
                        )}
                      >
                        {selected ? (
                          <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-brown text-cream">
                            <Check size={14} />
                          </span>
                        ) : null}
                        <p className="pr-8 text-sm font-extrabold uppercase tracking-wide text-brown-deep">
                          {s.name}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {s.shortDescription}
                        </p>
                        <p className="mt-3 font-semibold text-brown">
                          {formatPrice(s.price)} · {s.durationMin} min
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-6 sm:grid-cols-3">
                {professionals.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setProfessionalId(p.id)}
                    className="group text-center"
                  >
                    <div
                      className={cn(
                        "mx-auto mb-4 rounded-xl bg-white px-4 py-2 text-sm font-extrabold uppercase tracking-[0.14em] text-brown-deep shadow-sm transition",
                        professionalId === p.id && "ring-2 ring-brown",
                      )}
                    >
                      {p.name}
                    </div>
                    <div
                      className={cn(
                        "mx-auto aspect-square w-full max-w-[180px] rounded-full bg-gradient-to-b from-charcoal to-black transition",
                        professionalId === p.id &&
                          "ring-4 ring-brown ring-offset-4 ring-offset-panel-soft",
                      )}
                    />
                    <p className="mt-3 text-xs text-muted">{p.role}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 3 && (
              <div>
                <p className="mb-4 text-center text-xs text-muted">
                  Duración estimada de tu reserva:{" "}
                  <span className="font-semibold text-brown-deep">
                    {totalDuration} min
                  </span>
                </p>

                <div className="mb-4 grid grid-cols-3 gap-2 sm:gap-3">
                  {(
                    [
                      { key: "day", label: "DÍA", value: selectedParts.day },
                      { key: "month", label: "MES", value: selectedParts.month },
                      { key: "year", label: "AÑO", value: selectedParts.year },
                    ] as const
                  ).map((part, index) => {
                    const filled = Boolean(selectedDateObj);
                    return (
                      <motion.div
                        key={part.key}
                        layout
                        className={cn(
                          "relative overflow-hidden rounded-xl py-3 text-center shadow-sm",
                          filled
                            ? "bg-brown text-cream"
                            : "bg-white text-brown",
                        )}
                        animate={
                          filled
                            ? { scale: [1, 1.03, 1] }
                            : { scale: 1 }
                        }
                        transition={{
                          duration: 0.4,
                          delay: filled ? index * 0.07 : 0,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-70">
                          {part.label}
                        </p>
                        <div className="relative mt-0.5 h-7 overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.p
                              key={`${part.key}-${part.value}`}
                              initial={{ y: 14, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -14, opacity: 0 }}
                              transition={{
                                duration: 0.28,
                                delay: filled ? index * 0.06 : 0,
                              }}
                              className="font-serif text-xl font-semibold tracking-wide sm:text-2xl"
                            >
                              {part.value}
                            </motion.p>
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mb-3 flex items-center justify-center gap-2">
                  <button
                    type="button"
                    aria-label="Mes anterior"
                    disabled={!canGoPrevMonth}
                    onClick={() =>
                      setViewMonth((m) => startOfMonth(addMonths(m, -1)))
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-brown-deep shadow-sm transition enabled:hover:bg-cream disabled:opacity-30"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={format(viewMonth, "yyyy-MM")}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="min-w-[9.5rem] text-center font-sans text-xs font-extrabold uppercase tracking-[0.16em] text-brown-deep"
                    >
                      {format(viewMonth, "MMM yyyy", { locale: es })}
                    </motion.p>
                  </AnimatePresence>
                  <button
                    type="button"
                    aria-label="Mes siguiente"
                    disabled={!canGoNextMonth}
                    onClick={() =>
                      setViewMonth((m) => startOfMonth(addMonths(m, 1)))
                    }
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-brown-deep shadow-sm transition enabled:hover:bg-cream disabled:opacity-30"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={format(viewMonth, "yyyy-MM")}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.22 }}
                    className="grid max-h-48 grid-cols-4 gap-2 overflow-y-auto sm:grid-cols-5 md:grid-cols-7"
                  >
                    {calendarDays.map((day) => {
                      const value = format(day, "yyyy-MM-dd");
                      const disabled = isBefore(day, today);
                      const selected =
                        selectedDateObj && isSameDay(day, selectedDateObj);
                      return (
                        <button
                          key={value}
                          type="button"
                          disabled={disabled}
                          onClick={() => {
                            setDate(value);
                            setTime("");
                          }}
                          className={cn(
                            "rounded-xl bg-white px-2 py-2.5 text-center shadow-sm transition",
                            disabled && "cursor-not-allowed opacity-35",
                            !disabled && !selected && "hover:bg-cream",
                            selected && "ring-2 ring-brown bg-cream",
                          )}
                        >
                          <p className="text-base font-bold text-brown-deep">
                            {format(day, "d")}
                          </p>
                          <p className="text-[9px] uppercase tracking-wider text-muted">
                            {format(day, "EEE", { locale: es })}
                          </p>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>

                <p className="mb-3 mt-7 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink">
                  Hora
                </p>
                {!date ? (
                  <p className="text-center text-sm text-muted">
                    Selecciona primero un día.
                  </p>
                ) : loadingSlots ? (
                  <p className="text-center text-sm text-muted">Cargando…</p>
                ) : slots.length === 0 ? (
                  <p className="text-center text-sm text-muted">
                    Sin horarios este día.
                  </p>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6"
                  >
                    {slots.map((t, i) => (
                      <motion.button
                        key={t}
                        type="button"
                        initial={{ opacity: 0, scale: 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.015 }}
                        onClick={() => setTime(t)}
                        className={cn(
                          "rounded-xl bg-white py-2.5 text-sm font-semibold text-brown-deep shadow-sm",
                          time === t && "ring-2 ring-brown bg-cream",
                        )}
                      >
                        {t}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {step === 4 && (
              <div>
                <div className="mb-6 rounded-xl bg-white p-4 text-sm text-muted shadow-sm">
                  <p className="font-semibold text-ink">
                    Servicios ({selectedServices.length}):
                  </p>
                  <ul className="mt-2 space-y-1">
                    {selectedServices.map((s) => (
                      <li key={s.slug} className="flex justify-between gap-3">
                        <span>{s.name}</span>
                        <span className="text-brown-deep">
                          {formatPrice(s.price)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3">
                    <span className="font-semibold text-ink">Profesional:</span>{" "}
                    {professionals.find((p) => p.id === professionalId)?.name}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-ink">Fecha:</span> {date}{" "}
                    · {time}
                  </p>
                  <p className="mt-1">
                    <span className="font-semibold text-ink">Duración:</span>{" "}
                    {totalDuration} min
                  </p>
                  <p className="mt-3 font-serif text-xl text-brown">
                    Total {formatPrice(totalPrice)}
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Nombre
                    </span>
                    <input
                      className="input-field"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Tu nombre completo"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                      Teléfono
                    </span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">
                        🇨🇴
                      </span>
                      <input
                        className="input-field !pl-10"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="300 123 4567"
                        inputMode="tel"
                      />
                    </div>
                  </label>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          className="btn-outline-brown"
          disabled={step === 1 || submitting}
          onClick={() => goToStep((step > 1 ? step - 1 : step) as Step)}
        >
          <ArrowLeft size={14} /> Atrás
        </button>
        {step < 4 ? (
          <button
            type="button"
            className="btn-brown"
            disabled={!canContinue()}
            onClick={() => goToStep((step < 4 ? step + 1 : step) as Step)}
          >
            Continuar <ArrowRight size={14} />
          </button>
        ) : (
          <button
            type="button"
            className="btn-brown"
            disabled={!canContinue() || submitting}
            onClick={submit}
          >
            {submitting ? "Reservando…" : "Confirmar reserva"}
          </button>
        )}
      </div>
    </div>
  );
}
