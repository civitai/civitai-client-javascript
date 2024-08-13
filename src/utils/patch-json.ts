import { applyPatch, createPatch } from 'rfc6902';
import { JsonPatchOperation } from 'src/generated';

type IsAny<T> = 0 extends 1 & T ? true : false;
type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

type Primitive = null | undefined | string | number | boolean | symbol | bigint;

type BrowserNativeObject = Date | FileList | File;

type IsTuple<T extends ReadonlyArray<any>> = number extends T['length'] ? false : true;

type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;

type ArrayKey = number;

type AnyIsEqual<T1, T2> = T1 extends T2 ? (IsEqual<T1, T2> extends true ? true : never) : never;

type ExtractObjects<T> = T extends infer U ? (U extends object ? U : never) : never;

type DeepPartial<T> = T extends BrowserNativeObject
  ? T
  : {
      [K in keyof T]?: ExtractObjects<T[K]> extends never ? T[K] : DeepPartial<T[K]>;
    };

type PathImpl<K extends string | number, V, TraversedTypes> = V extends
  | Primitive
  | BrowserNativeObject
  ? `${K}`
  : // Check so that we don't recurse into the same type
    // by ensuring that the types are mutually assignable
    // mutually required to avoid false positives of subtypes
    true extends AnyIsEqual<TraversedTypes, V>
    ? `${K}`
    : V extends ReadonlyArray<unknown>
      ? `${K}` | `${K}/-` | `${K}/${PathInternal<V, TraversedTypes | V>}`
      : `${K}` | `${K}/${PathInternal<V, TraversedTypes | V>}`;

type PathInternal<T, TraversedTypes = T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKeys<T>]-?: PathImpl<K & string, T[K], TraversedTypes>;
        }[TupleKeys<T>]
      : PathImpl<ArrayKey, V, TraversedTypes>
    : {
        [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes>;
      }[keyof T];

type ArrayPathImpl<K extends string | number, V, TraversedTypes> = V extends
  | Primitive
  | BrowserNativeObject
  ? IsAny<V> extends true
    ? string
    : never
  : V extends ReadonlyArray<infer U>
    ? U extends Primitive | BrowserNativeObject
      ? IsAny<V> extends true
        ? string
        : never
      : // Check so that we don't recurse into the same type
        // by ensuring that the types are mutually assignable
        // mutually required to avoid false positives of subtypes
        true extends AnyIsEqual<TraversedTypes, V>
        ? never
        : `${K}` | `${K}/${ArrayPathInternal<V, TraversedTypes | V>}`
    : true extends AnyIsEqual<TraversedTypes, V>
      ? never
      : `${K}/${ArrayPathInternal<V, TraversedTypes | V>}`;

type ArrayPathInternal<T, TraversedTypes = T> =
  T extends ReadonlyArray<infer V>
    ? IsTuple<T> extends true
      ? {
          [K in TupleKeys<T>]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>;
        }[TupleKeys<T>]
      : ArrayPathImpl<ArrayKey, V, TraversedTypes>
    : {
        [K in keyof T]-?: ArrayPathImpl<K & string, T[K], TraversedTypes>;
      }[keyof T];

type ArrayPath<T> = T extends any ? ArrayPathInternal<T> : never;

export type JsonPatchPath<T> = T extends any ? PathInternal<T> : never;
export type JsonPatchPathValue<T, P extends JsonPatchPath<T> | ArrayPath<T>> = T extends any
  ? P extends `${infer K}/${infer R}`
    ? K extends keyof T
      ? R extends JsonPatchPath<T[K]>
        ? JsonPatchPathValue<T[K], R>
        : R extends '-'
          ? NonNullable<T[K]> extends ReadonlyArray<any>
            ? NonNullable<T[K]>[0]
            : never
          : never
      : K extends `${ArrayKey}`
        ? T extends ReadonlyArray<infer V>
          ? JsonPatchPathValue<V, R & JsonPatchPath<V>>
          : never
        : never
    : P extends keyof T
      ? T[P]
      : P extends `${ArrayKey}`
        ? T extends ReadonlyArray<infer V>
          ? V
          : never
        : never
  : never;

// export function jsonPatchOperationFactory<TData extends object>() {
//   return function <
//     TOperation extends 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test',
//     TPath extends JsonPatchPath<TData>,
//     TFrom extends JsonPatchPath<TData> = any,
//   >(data: {
//     op: TOperation;
//     path: TPath;
//     from?: TFrom;
//     value: DeepPartial<JsonPatchPathValue<TData, TPath>>;
//   }) {
//     return {
//       op: data.op,
//       path: data.path,
//       from: data.from ? data.from : undefined,
//       value: data.value,
//     };
//   };
// }

export class JsonPatchFactory<TData extends object> {
  private _operations: JsonPatchOperation[] = [];

  get operations() {
    return this._operations;
  }

  addOperation<
    TOperation extends 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test',
    TPath extends JsonPatchPath<TData>,
    TFrom extends JsonPatchPath<TData> = any,
  >(data: {
    op: TOperation;
    path: TPath;
    from?: TFrom;
    value?: DeepPartial<JsonPatchPathValue<TData, TPath>>;
  }) {
    const operation = {
      op: data.op,
      path: `/${data.path}`,
      from: data.from ? `/${data.from}` : undefined,
      value: data.value instanceof Date ? data.value.toJSON() : data.value,
    };

    this._operations.push(operation);
  }
}

// export function createJsonPatchOperation<
//   TOperation extends 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test',
//   TData extends object,
//   TPath extends JsonPatchPath<TData>,
//   TFrom extends JsonPatchPath<TData> = any,
// >(
//   jsonObj: TData,
//   data: {
//     op: TOperation;
//     path: TPath;
//     from?: TFrom;
//     value: DeepPartial<JsonPatchPathValue<TData, TPath>>;
//   }
// ) {
//   return jsonPatchOperationFactory<TData>()(data);
// }

export { applyPatch, createPatch };

// type Model = {
//   params?:
//     | {
//         prompt: string;
//         cfgScale: number;
//         sampler: string;
//         steps: number;
//         clipSkip: number;
//         baseModel:
//           | 'ODOR'
//           | 'Pony'
//           | 'Lumina'
//           | 'Kolors'
//           | 'SD1'
//           | 'SD2'
//           | 'SD3'
//           | 'SDXL'
//           | 'SDXLDistilled'
//           | 'SCascade'
//           | 'PixArtA'
//           | 'PixArtE'
//           | 'HyDit1';
//         nsfw: boolean;
//         quantity: number;
//         draft: boolean;
//         width: number;
//         height: number;
//         workflow: string;
//         negativePrompt?: string | undefined;
//         seed?: number | undefined;
//         aspectRatio?: string | undefined;
//         denoise?: number | undefined;
//         image?: string | undefined;
//         upscale?: number | undefined;
//       }
//     | undefined;
//   resources?:
//     | {
//         id: number;
//         strength: number;
//       }[]
//     | undefined;
//   remix?:
//     | {
//         versionId?: number | undefined;
//         imageId?: number | undefined;
//       }
//     | undefined;
//   images?:
//     | Record<
//         string,
//         {
//           hidden?: boolean | undefined;
//           feedback?: 'liked' | 'disliked' | undefined;
//           comments?: string | undefined;
//           postId?: number | undefined;
//         }
//       >
//     | undefined;
// };

// const data: Model = {
//   params: {
//     prompt:
//       'score_9, score_8_up, score_8, (solo), (fluffy:0.8), (feral), outdoors, furry, (((mouse))), female, glowing red eyes, grey fur, black ears, claws, (fluffy cheeks:0.4), witch hat, (black dress), (red glowing magical staff), (cute:0.3), in the style of beatrix potter, cel-shading, monochromemuse, monochrome, greyscale, ink splatter, sky, backlit, dark aura, arkane_dark. dramatic angle',
//     negativePrompt:
//       'score_6, score_5, score_4, (cub, young, child, chibi:1.5), busty, ugly face, low res, blurry face, ugly hands, pumped body, penis, clothing, breasts, big ears, ((hair)), nipples, green fur, belly, extra ears, human, blue fur, panties, signature, buildings, city, By bad artist, (tail)',
//     cfgScale: 4,
//     sampler: 'Euler a',
//     seed: 1514815761,
//     clipSkip: 2,
//     steps: 29,
//     quantity: 4,
//     nsfw: false,
//     draft: false,
//     baseModel: 'Pony',
//     width: 832,
//     height: 1216,
//     workflow: 'txt2img',
//   },
//   resources: [
//     {
//       id: 290640,
//       strength: 1,
//     },
//     {
//       id: 6056,
//       strength: 1,
//     },
//     {
//       id: 382152,
//       strength: 0.5,
//     },
//     {
//       id: 423178,
//       strength: 0.3,
//     },
//     {
//       id: 600002,
//       strength: 1.5,
//     },
//     {
//       id: 601833,
//       strength: 1,
//     },
//   ],
//   images: {
//     ACQQ7MYKJ79SPNCFXVFW8C95E0: {
//       feedback: 'liked',
//     },
//   },
// };

// const patchOperation = jsonPatchOperationFactory<Model>();

// applyPatch(data, [
//   patchOperation({
//     op: 'add',
//     path: `images/ACQQ7MYKJ79SPNCFXVFW8C95E0/hidden`,
//     value: true,
//   }),
//   patchOperation({ op: 'add', path: `images/abcd`, value: { hidden: false } }),
//   patchOperation({ op: 'add', path: `images/abcd/hidden`, value: true }),
// ]);
