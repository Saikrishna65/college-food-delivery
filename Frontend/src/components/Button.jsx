import clsx from "clsx";

const Button = ({ id, title, rightIcon, leftIcon, containerClass }) => {
  return (
    <button
      id={id}
      className={clsx(
        "group relative z-10 inline-block cursor-pointer overflow-hidden rounded-full bg-green-500 px-7 py-3 text-black",
        containerClass
      )}
    >
      {/* Flex wrapper to keep icon-title-icon on one line */}
      <div className="flex items-center gap-2">
        {leftIcon}

        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
          {/* Top text slides up & skews on hover */}
          <span
            className="
              block
              transform
              translate-y-0
              skew-y-0
              transition
              duration-500
              group-hover:-translate-y-[160%]
              group-hover:skew-y-12
            "
          >
            {title}
          </span>
          {/* Bottom text slides into view */}
          <span
            className="
              absolute
              inset-x-0
              bottom-0
              block
              transform
              translate-y-[164%]
              skew-y-12
              transition
              duration-500
              group-hover:translate-y-0
              group-hover:skew-y-0
            "
          >
            {title}
          </span>
        </span>

        {rightIcon}
      </div>
    </button>
  );
};

export default Button;
