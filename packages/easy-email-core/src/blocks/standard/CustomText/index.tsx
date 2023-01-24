import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { Text } from '@core/components/Text';
import { Liquid } from 'liquidjs';
import { getPreviewClassName } from '@core/utils';
import _ from 'lodash';

export type ICustomText = IBlockData<
  {
    color?: string;
    'font-family'?: string;
    'font-size'?: string;
    'font-style'?: string;
    'font-weight'?: string;
    'line-height'?: string;
    'letter-spacing'?: string;
    height?: string;
    'text-decoration'?: string;
    'text-transform'?: string;
    align?: string;
    'container-background-color'?: string;
    width?: string;
    padding?: string;
    mergeTagKey: string;
  },
  {
    content: string;
  }
>;

export const CustomText = createBlock<ICustomText>({
  name: 'Editable Text',
  type: BasicType.CUSTOM_TEXT,
  create: (payload) => {
    const defaultData: ICustomText = {
      type: BasicType.CUSTOM_TEXT,
      data: {
        value: {
          content: '{{text}}',
        },
      },
      attributes: {
        mergeTagKey: 'text',
      },
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [BasicType.PAGE],
  render: ({ data, idx, mode, context, dataSource }) => {
    if(!dataSource) {
      dataSource = {};
    }
    if (new RegExp(`{{${data.attributes.mergeTagKey}.*}}`).test(data.data.value.content)) {
      data.data.value.content = _.cloneDeep(dataSource)[data.attributes.mergeTagKey];
    } else {
      dataSource[data.attributes.mergeTagKey] = data.data.value.content;
    }
    let mjml = `{{${data.attributes.mergeTagKey}}}`;
    const engine = new Liquid();
    try {
      mjml = engine.parseAndRenderSync(
        mjml, dataSource
      );
    }
    catch (err) {
    }
    return (
      <Text
        css-class={mode=='testing' ? getPreviewClassName(idx || null, data.type) : ''}
        {...data.attributes}
      >
        {mjml}
      </Text>
    );
  },
});
