<template>
  <div class="min-h-screen bg-[#f6f0ed] py-8 px-4">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-[#191970] text-left mb-12">{{ title }}</h1>

      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
    name: "PageContainer",
    props: {
        title: String
    }
}
</script>
<style>
    
</style>