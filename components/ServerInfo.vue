<template>
    <p>
        <span v-if="metaInfo?.api.isConnected">🟢</span> 
        <span v-if="!metaInfo?.api.isConnected">🔴</span> 
        LWS Admin Server: {{ metaInfo?.api.serverUrl }}</p>
</template>
<script setup lang="ts">
const { pending: pendingMeta, data: metaInfo, refresh: refreshMeta } = useLazyFetch('/api/meta')

setInterval(() => {
    refreshMeta()
}, 10000)
</script>