<script setup lang="ts">
import TimeLine from '../components/TimeLine.vue'
import Loader from '../components/Loader.vue'
import HomeBanner from '../components/HomeBanner.vue'
</script>

<template>
  <Suspense>
    <template #default>
      <HomeBanner />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>
