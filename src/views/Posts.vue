<script setup lang="ts">
import TimeLine from '../components/TimeLine.vue'
import Loader from '../components/Loader.vue'
import Breadcrumbs from '../components/Breadcrumbs.vue'
</script>

<template>
  <Breadcrumbs />
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback>
      <Loader />
    </template>
  </Suspense>
</template>
