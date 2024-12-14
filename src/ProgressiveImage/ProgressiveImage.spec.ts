import { ref } from "vue";
import { mount } from "@vue/test-utils";
import {
  beforeEach,
  afterEach,
  describe,
  expect,
  test,
  vi,
  Mock,
} from "vitest";
import ProgressiveImage from "./ProgressiveImage.vue";
import { useIntersect } from "../composables/useIntersect";
import { useImage } from "../composables/useImage";

vi.mock("../composables/useIntersect", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === "object" ? actual : {}),
    useIntersect: vi.fn(),
  };
});

vi.mock("../composables/useImage", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === "object" ? actual : {}),
    useImage: vi.fn(),
  };
});

describe("ProgressiveImage", () => {
  beforeEach(() => {
    (useIntersect as Mock).mockReturnValue({
      isIntersecting: ref(true),
      isReady: ref(true),
      hasIntersectedOnce: ref(true),
      watchIntersectionOnce: vi.fn(),
    });

    (useImage as Mock).mockReturnValue({
      width: ref(700),
      height: ref(400),
      aspectRatio: ref(0.5625),
      loadImage: vi.fn(() => Promise.resolve()),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("render image", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("the image is not rendered when is not intersected", () => {
    (useIntersect as Mock).mockReturnValue({
      isIntersecting: ref(false),
      isReady: ref(true),
      hasIntersectedOnce: ref(false),
      watchIntersectionOnce: vi.fn(),
    });

    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
      },
    });

    expect(wrapper.find("img.v-progressive-image-main").exists()).toEqual(
      false
    );
  });

  test("render image with placeholder", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("use custom blur", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        blur: 50,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("use alt attribute", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        alt: "image description",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("use object cover", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        objectCover: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("render default slot", () => {
    const wrapper = mount(ProgressiveImage, {
      slots: {
        default: "<div>lorem ipsum</div>",
      },
      props: {
        src: "main-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("render default slot props", () => {
    const wrapper = mount(ProgressiveImage, {
      slots: {
        default: `<template #default="params">{{ params }}</template>`,
      },
      props: {
        src: "main-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("lazy load placeholder images", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        lazyPlaceholder: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("render title attributes", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        title: "lorem ipsum dolor sit amet",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
