import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@components/ui/select";

function Dropdown({
  label,
  placeholder = "Select an option",
  items,
  onChange,
  value,
}: {
  label: string;
  placeholder?: string;
  items: Array<{ value: string; label: string }>;
  onChange?: (value: string) => void;
  value?: string;
}) {
  const handleValueChange = (value: string) => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      <Select onValueChange={handleValueChange} value={value}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default Dropdown;
