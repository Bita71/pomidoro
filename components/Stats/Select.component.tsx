import classNames from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactSelect, { StylesConfig } from "react-select";
import styles from "../../styles/modules/stats/select.module.scss";

interface DropdownIndicatorProps {
  isOpen: boolean;
  isFocused: boolean;
}

const DropdownIndicator: React.FC<DropdownIndicatorProps> = ({
  isOpen,
  isFocused,
}) => {
  return (
    <button
      type="button"
      className={classNames("reset-button", styles.arrow, {
        [styles.focus]: isFocused && isOpen,
      })}
    >
      <svg
        width="16"
        height="10"
        viewBox="0 0 16 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2" />
      </svg>
    </button>
  );
};

interface TOption {
  value: string;
  label: string;
}

const options: TOption[] = [
  { value: "current", label: "Эта неделя" },
  { value: "last", label: "Прошлая неделя" },
  { value: "last/2", label: "2 недели назад" },
];
const selectStyles: StylesConfig = {
  container: (base) => ({
    ...base,
  }),
  control: () => ({
    display: "flex",
    backgroundColor: "#f4f4f4",
    cursor: "pointer",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: "19px 15px",
  }),

  indicatorSeparator: () => ({}),
  menu: (base) => ({
    ...base,
    margin: 0,
    boxShadow: "none",
    borderRadius: 0,
    backgroundColor: "#f4f4f4",
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
    borderTop: "1px solid #DEDEDE",
  }),
  option: () => ({
    padding: "19px 15px",
    borderBottom: "1px solid #DEDEDE",
    cursor: "pointer",
  }),
};

const config = {
  isSearchable: false,
  hideSelectedOptions: true,
  name: "week",
  styles: selectStyles,
  options: options,
  id: "long-value-select",
  instanceId: "long-value-select",
};

interface SelectProps {
  className?: string;
}

const Select: React.FC<SelectProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(options[0]);
  const router = useRouter();

  useEffect(() => {
    const { week, weekNumber } = router.query;
    if (!week) {
      setValue(options[0]);
    } else if (!weekNumber) {
      setValue(options[1]);
    } else {
      const newValue = options.find(
        (item) => item.value == `${week}/${weekNumber}`
      );
      setValue(newValue);
    }
  }, [router.query]);

  const handleChange = (newValue: TOption) => {
    if (newValue.value === "current") {
      router.push("/stats");
      return;
    }
    router.push("/stats/" + newValue.value);
  };
  return (
    <form className={className}>
      <ReactSelect
        {...config}
        value={value}
        onMenuOpen={() => setIsOpen(true)}
        onMenuClose={() => setIsOpen(false)}
        onChange={handleChange}
        components={{
          DropdownIndicator: ({ isFocused }) => (
            <DropdownIndicator isFocused={isFocused} isOpen={isOpen} />
          ),
        }}
      />
    </form>
  );
};

export default Select;
