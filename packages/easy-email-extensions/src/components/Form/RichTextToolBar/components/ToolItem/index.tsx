import { Tooltip } from '@arco-design/web-react';
import { classnames } from '@extensions/utils/classnames';
import React, { useEffect, useRef } from 'react';

export const ToolItem: React.FC<{
  title?: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  trigger?: string;
  style?: React.CSSProperties;
  isActive?: boolean;
}> = props => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { onClick } = props;

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current?.addEventListener('click', event => {
        onClick?.(event as unknown as any);
      });
    }
  }, [btnRef, onClick]);

  if (!props.title) {
    return (
      <button
        tabIndex={-1}
        className='easy-email-extensions-emailToolItem'
        title={props.title}
        onClick={props.onClick}
        style={props.style}
      >
        {props.icon}
      </button>
    );
  }
  return (
    <Tooltip
      mini
      position='bottom'
      content={props.title}
    >
      <button
        ref={btnRef}
        tabIndex={-1}
        className={classnames(
          'easy-email-extensions-emailToolItem',
          props.isActive && 'easy-email-extensions-emailToolItem-active',
        )}
        title={props.title}
        onClick={e => {
          // console.log('clicked');
          // if (props.onClick) props.onClick(e);
        }}
        style={props.style}
      >
        {props.icon}
      </button>
    </Tooltip>
  );
};
