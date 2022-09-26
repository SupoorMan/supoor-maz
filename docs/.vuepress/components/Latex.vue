<template>
  <span ref="latex" class="katex" v-html="rawHTML"></span>
</template>

<script>
import katex from "katex";
import "katex/dist/katex.css";

export default {
  name: "latex",
  data() {
    return {
      rawHTML: "",
    };
  },
  mounted() {
    this.rawHTML = katex.renderToString(this.$slots.default[0].text, {
      throwOnError: false,
    });
    /*
    // 另一种方法
    katex.render(this.$slots.default[0].text, this.$refs.latex, {
      throwOnError: false,
    });
    */
  },
};
</script>

<style scoped>
  .katex{
    font-size: 14px;
    color: rgb(22, 98, 34);
  }
</style>


