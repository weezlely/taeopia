import type { CSSProperties, ChangeEvent, Ref } from "react";
import * as React from "react";
import clsx from "clsx";

import type { RadioGroupProps, RadioInputProps, RadioLabelProps } from "./radio.type";
import { useRadioContext } from "./radio.context";
import { RadioProvider } from "./radio.provider";
import * as styles from "./styles.css";

// Radio's Group
const RadioGroup: React.FC<RadioGroupProps> = ({ name = "radio-group", style, children, ...rest }) => {
  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as any, {
          name,
          ...rest,
        })
      )}
    </>
  );
};

// Radio's Label
const RadioLabel = React.forwardRef<HTMLLabelElement, RadioLabelProps>(
  (
    { id = "", label = "", checked = true, circleColor = "#f86480", backgroundColor = "#f86480", style, children, ...rest },

    forwardedRef
  ) => {
    /**
     * @description static-change style depending on the Props
     */
    const labelStaticStyle = [styles.label];
    const spanStaticStyle = [styles.on, { [styles.checked]: checked }];
    /**
     * @description dynamic-change style depending on the Props
     */

    const dynamicCircleStyle: CSSProperties = {
      background: backgroundColor,
      ...style,
    };

    /**
     * @description classNames for static-change style
     */
    const labelClassNames: string = clsx(...labelStaticStyle);
    const spanClassNames: string = clsx(...spanStaticStyle);
    return (
      <label id={id} ref={forwardedRef} htmlFor={label} className={labelClassNames} style={style} {...rest}>
        {children}
        <span className={spanClassNames} style={dynamicCircleStyle} />
        {label}
      </label>
    );
  }
);

// RadioLabel.propTypes = {
//   id: PropTypes.string,
//   label: PropTypes.string.isRequired,
//   checked: PropTypes.bool,
//   circleColor: PropTypes.string,
//   backgroundColor: PropTypes.string,
//   style: PropTypes.object,
//   children: PropTypes.node.isRequired,
// };

const RadioInput = React.forwardRef(
  (
    { id = undefined, name = undefined, value = undefined, checked = true, disabled = false, onChange = undefined, style, ...rest }: RadioInputProps,

    forwardedRef: Ref<HTMLInputElement>
  ) => {
    /**
     * @description static-change style depending on the Props
     */
    const staticStyle = [styles.hiddenRadio];

    /**
     * @description dynamic-change style depending on the Props
     */

    const dynamicStyle: CSSProperties = { ...style };
    /**
     * @description classNames for static-change style
     */
    const classNames = clsx(staticStyle);

    return (
      <input
        ref={forwardedRef}
        id={id}
        type="radio"
        className={classNames}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={dynamicStyle}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

// RadioInput.propTypes = {
//   name: PropTypes.string,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   checked: PropTypes.bool,
//   defaultChecked: PropTypes.bool,
//   disabled: PropTypes.bool,
//   style: PropTypes.object,
//   children: PropTypes.node.isRequired,
// };

// Radio's Option
const RadioOption = React.forwardRef(function (
  {
    id = "",
    label = "",
    value = "",
    name = "",
    defaultChecked = false,
    onChange = undefined,
    circleColor,
    backgroundColor,
    style,
    children,
    ...rest
  }: RadioLabelProps & RadioInputProps,

  forwardedRef: Ref<HTMLInputElement>
) {
  const { value: selectedValue, handleChange, propsOnChange } = useRadioContext();

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    if (handleChange && typeof handleChange === "function" && value) {
      handleChange(value);
    }

    if (onChange && typeof onChange === "function") {
      onChange(event);
    }

    if (propsOnChange && typeof propsOnChange === "function") {
      propsOnChange({ value, name });
    }
  };

  const memorizeChecked = React.useMemo(() => (defaultChecked ? defaultChecked : selectedValue === value), [selectedValue]);

  return (
    <RadioLabel id={id} label={label} checked={memorizeChecked} style={style} circleColor={circleColor} backgroundColor={backgroundColor}>
      <RadioInput id={label} ref={forwardedRef} value={value} checked={memorizeChecked} onChange={handleRadioChange} {...rest} />
    </RadioLabel>
  );
});

const Radio = Object.assign(RadioProvider, {
  Group: RadioGroup,
  Option: RadioOption,
});

export default Radio;
