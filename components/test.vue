<template>
    <p>test template</p>
    
    {{  pending }}
    {{  accounts }}
</template>
<script setup lang="ts">
const { pending, data: accounts, refresh } = useLazyFetch('/api/list-accounts')

</script>