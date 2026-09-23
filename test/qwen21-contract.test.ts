import type {
  ComfyQwen21CreateImageGenInput,
  ComfyQwen21EditImageGenInputWritable,
  ComfyQwen20bEditImageGenInputWritable,
  ImageGenStepTemplate,
} from '../src';

describe('Qwen request types', () => {
  // ts-jest checks these assignments. In particular, the generated Writable
  // operation used to be the TypeScript type name instead of the wire value.
  it('accepts the 2.1 create and edit contracts in image generation steps', () => {
    const create: ComfyQwen21CreateImageGenInput = {
      engine: 'comfy',
      ecosystem: 'qwen',
      model: '2.1',
      operation: 'createImage',
      prompt: 'A teal ceramic teapot beside two lemons',
      width: 2048,
      height: 2048,
      steps: 25,
      cfgScale: 1,
    };
    const edit: ComfyQwen21EditImageGenInputWritable = {
      engine: 'comfy',
      ecosystem: 'qwen',
      model: '2.1',
      operation: 'editImage',
      prompt: 'Change the teapot in <image1> to red',
      images: ['https://example.com/teapot.png'],
      resolution: 2048,
      loras: { 'urn:air:qwen21:lora:civitai:123@456': 0.75 },
    };
    const steps = [
      { $type: 'imageGen', input: create },
      { $type: 'imageGen', input: edit },
    ] satisfies ImageGenStepTemplate[];
    expect(steps.map((step) => step.input?.operation)).toEqual(['createImage', 'editImage']);
    expect(edit).not.toHaveProperty('width');
    expect(edit).not.toHaveProperty('height');
  });

  it('retains strict wire discriminators for writable Qwen inputs', () => {
    const legacy: ComfyQwen20bEditImageGenInputWritable['operation'] = 'editImage';
    const current: ComfyQwen21EditImageGenInputWritable['operation'] = 'editImage';
    // @ts-expect-error Type names are never valid wire operations.
    const invalidOperation: typeof current = 'ComfyQwen21EditImageGenInputWritable';
    // @ts-expect-error The 2.1 contract must not accept a 20B model discriminator.
    const invalidModel: ComfyQwen21CreateImageGenInput['model'] = '20b';
    expect(legacy).toBe(current);
    expect(invalidOperation).not.toBe(current);
    expect(invalidModel).not.toBe('2.1');
  });
});
