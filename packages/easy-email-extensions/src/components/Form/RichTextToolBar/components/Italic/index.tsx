import { PopoverProps, Tooltip } from '@arco-design/web-react';
import React, { useCallback, useMemo, useEffect, useRef } from 'react';
import { IconFont } from 'easy-email-editor';
import { ToolItem } from '../ToolItem';
import { EMAIL_BLOCK_CLASS_NAME } from 'easy-email-core';
import { useSelectionRange } from '@extensions/AttributePanel/hooks/useSelectionRange';
// import { getEditorRoot } from 'easy-email-editor';

export interface LinkProps extends PopoverProps {
  currentRange: Range | null | undefined;
  onChange: () => void;
}

function getItalicNode(node: Node | null | undefined): Element | null {
  if (!node) return null;
  if (node instanceof Element && node.classList.contains(EMAIL_BLOCK_CLASS_NAME))
    return null;
  if (node instanceof Element && node.tagName.toLocaleLowerCase() === 'i') return node;
  return getItalicNode(node.parentNode);
}

export function Italic(props: LinkProps) {
  const { onChange } = props;
  const { setRangeByElement } = useSelectionRange();
  const node = useMemo(() => {
    return getItalicNode(props.currentRange?.commonAncestorContainer);
  }, [props.currentRange]);

  // useEffect(() => {
  //   console.log(
  //     getEditorRoot()?.shadowRoot?.querySelectorAll(
  //       '.easy-email-extensions-emailToolItem-Italic',
  //     ),
  //   );
  //   const italicButton = getEditorRoot()?.shadowRoot?.querySelector(
  //     '.easy-email-extensions-emailToolItem-Italic',
  //   );
  //   italicButton?.addEventListener('click', () => console.log('clicked'));
  // }, []);

  const onClick = useCallback(() => {
    if (node) {
      setRangeByElement(node);
    }
    onChange();
  }, [node, onChange, setRangeByElement]);

  const btnRef = useRef<HTMLButtonElement>(null);
  btnRef?.current?.addEventListener('click', () => console.log('clicked'));

  console.log(btnRef.current, 'button REF');

  return (
    <Tooltip
      color='#fff'
      position='tl'
      content='Italic'
    >
      <ToolItem
        title='Italic'
        isActive={Boolean(node)}
        icon={<IconFont iconName='icon-italic' />}
        onClick={onClick}
      />
    </Tooltip>
  );
}
