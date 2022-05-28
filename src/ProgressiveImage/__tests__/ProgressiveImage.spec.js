import { mount } from "@vue/test-utils";
import { describe, expect, test, vi } from "vitest";
import ProgressiveImage from "../ProgressiveImage.vue";

vi.mock("../../composables/useIntersect.js", () => {
  return {
    default: () => {
      return {
        isIntersected: () => true,
        watchIntersectionOnce: (fn) => fn(),
      };
    },
  };
});

describe("ProgressiveImage", () => {
  test("render image", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("render image with placeholder", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("use custom blur", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        blur: 50,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("use alt attribute", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        alt: "image description",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("use object cover", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
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
      propsData: {
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
      propsData: {
        src: "main-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("load placeholder image regardless of intersection", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        placeholderSrc: "placeholder-image.jpg",
        loadPlaceholder: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("render title attributes", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        title: "lorem ipsum dolor sit amet",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
