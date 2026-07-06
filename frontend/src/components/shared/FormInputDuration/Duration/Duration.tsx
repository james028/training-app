import { useController, useFormContext } from "react-hook-form";

const normalize = (v: string) => v.replace(/\D/g, "").slice(0, 2);

const pad = (v: string) => v.padStart(2, "0");

type Props = {
  name: string;
  className?: string;
};

const Duration = ({ name, className = "" }: Props) => {
  const { control } = useFormContext();

  const { field } = useController({
    name,
    control,
    defaultValue: "00:00:00",
  });

  const [h, m, s] = (field.value || "00:00:00").split(":");

  const emit = (nh: string, nm: string, ns: string) => {
    field.onChange(`${nh}:${nm}:${ns}`);
  };

  const handleChange = (value: string, type: "h" | "m" | "s") => {
    const clean = normalize(value);

    if (type === "h") emit(clean, m, s);
    if (type === "m") emit(h, clean, s);
    if (type === "s") emit(h, m, clean);
  };

  const handleBlur = () => {
    field.onChange(`${pad(h)}:${pad(m)}:${pad(s)}`);
    field.onBlur();
  };

  return (
    <div className="flex gap-2">
      <input
        value={h}
        onChange={(e) => handleChange(e.target.value, "h")}
        onBlur={handleBlur}
        inputMode="numeric"
        maxLength={2}
        className={`w-12 text-center border ${className}`}
      />

      <input
        value={m}
        onChange={(e) => handleChange(e.target.value, "m")}
        onBlur={handleBlur}
        inputMode="numeric"
        maxLength={2}
        className={`w-12 text-center border ${className}`}
      />

      <input
        value={s}
        onChange={(e) => handleChange(e.target.value, "s")}
        onBlur={handleBlur}
        inputMode="numeric"
        maxLength={2}
        className={`w-12 text-center border ${className}`}
      />
    </div>
  );
};

export default Duration;
