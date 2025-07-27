// @ts-expect-error
import UnpluginTypia from '@ryoppippi/unplugin-typia/bun';
import { plugin } from 'bun';

plugin(UnpluginTypia({ cache: true }));
