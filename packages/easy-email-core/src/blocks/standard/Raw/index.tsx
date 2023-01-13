import React from 'react';
import { IBlockData } from '@core/typings';
import { BasicType } from '@core/constants';
import { createBlock } from '@core/utils/createBlock';
import { merge } from 'lodash';
import { getAdapterAttributesString } from '@core/utils';
import { BasicBlock } from '@core/components/BasicBlock';
import { Liquid } from 'liquidjs';

export type IRaw = IBlockData<{}, { content: string }>;

export const Raw = createBlock<IRaw>({
  name: 'Raw',
  type: BasicType.RAW,
  create: payload => {
    const defaultData: IRaw = {
      type: BasicType.RAW,
      data: {
        value: {
          content: '<% if (user) { %>',
        },
      },
      attributes: {},
      children: [],
    };
    return merge(defaultData, payload);
  },
  validParentType: [
    BasicType.PAGE,
    BasicType.WRAPPER,
    BasicType.SECTION,
    BasicType.GROUP,
    BasicType.COLUMN,
    BasicType.HERO,
  ],
  render(params) {
    let data = params.data.data.value.content;
    if (params.data.attributes.renderInEditor) {
      const engine = new Liquid();
      data = engine.parseAndRenderSync(data, params.dataSource);
    }
    return (
      <BasicBlock
        params={params}
        tag='mj-raw'
      >
        {data}
      </BasicBlock>
    );
  },
});
