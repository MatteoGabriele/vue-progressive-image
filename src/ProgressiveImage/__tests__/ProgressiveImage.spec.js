import { mount } from "@vue/test-utils";
import { describe, beforeEach, expect, test, vi } from "vitest";
import ProgressiveImage from "../ProgressiveImage.vue";

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

  test("use circle shape", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        circle: true,
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

  test("use object contain", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        objectContain: true,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("use select none", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        selectNone: true,
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

  test("custom aspect ratio", () => {
    const wrapper = mount(ProgressiveImage, {
      propsData: {
        src: "main-image.jpg",
        aspectRatio: 3.2,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
