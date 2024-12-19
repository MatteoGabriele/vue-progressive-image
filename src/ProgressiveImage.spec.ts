import { ref, nextTick } from "vue";
import { flushPromises, mount } from "@vue/test-utils";
import type { Mock } from "vitest";

import ProgressiveImage from "@/ProgressiveImage.vue";
import { useIntersect } from "@/composables/useIntersect";
import { useImage } from "@/composables/useImage";

vi.mock("@/composables/useIntersect", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === "object" ? actual : {}),
    useIntersect: vi.fn(),
  };
});

vi.mock("@/composables/useImage", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...(typeof actual === "object" ? actual : {}),
    useImage: vi.fn(),
  };
});

describe("ProgressiveImage", () => {
  beforeEach(() => {
    vi.useFakeTimers();

    (useIntersect as Mock).mockReturnValue({
      isIntersecting: ref(true),
      isReady: ref(true),
      hasIntersectedOnce: ref(true),
      watchIntersectionOnce: vi.fn((callback) => {
        callback();
      }),
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
    vi.useRealTimers();
  });

  test("render component", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });

  test("the image should be visible", async () => {
    const wrapper = mount(ProgressiveImage, {
      attachTo: document.body,
      props: {
        src: "main-image.jpg",
      },
    });

    await flushPromises(); // wait image load
    vi.runAllTimers(); // run delay timer
    await nextTick(); // wait next rendering cycle

    expect(wrapper.find("img.v-progressive-image-main").isVisible()).toEqual(
      true
    );
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

    expect(
      wrapper.find("img.v-progressive-image-placeholder").exists()
    ).toEqual(true);
  });

  test("use alt attribute", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        alt: "image description",
      },
    });

    expect(
      wrapper.find("img.v-progressive-image-main").attributes("alt")
    ).toEqual("image description");
  });

  test("use object cover", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        objectCover: true,
      },
    });

    expect(
      wrapper
        .find(".v-progressive-image.v-progressive-image-object-cover")
        .exists()
    ).toEqual(true);
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

    expect(wrapper.find(".v-progressive-image-slot-default").text()).toEqual(
      "lorem ipsum"
    );
  });

  test("lazy load placeholder images", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        placeholderSrc: "placeholder-image.jpg",
        lazyPlaceholder: true,
      },
    });

    expect(
      wrapper.find("img.v-progressive-image-placeholder").attributes("loading")
    ).toEqual("lazy");
  });

  test("render title attributes", () => {
    const wrapper = mount(ProgressiveImage, {
      props: {
        src: "main-image.jpg",
        title: "lorem ipsum dolor sit amet",
      },
    });

    expect(
      wrapper.find("img.v-progressive-image-main").attributes("title")
    ).toEqual("lorem ipsum dolor sit amet");
  });
});
