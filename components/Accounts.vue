<template>
    <section v-if="accountData?.api.active">
    <h2>Active Accounts:</h2>
    <p>
      <ul>
        <li v-for="account in accountData.api.active" :key="account.access_time">
          <p>
            Address: {{ account.address }}
          </p>
          <p>
            Height: {{ account.scan_height }}
          </p>
          <form @submit.prevent="rescanForm">
            <label for="rescanHeight">Rescan Height</label>
            <input type="number" id="rescanHeight" name="rescanHeight">
            <input type="hidden" id="address" name="address" v-model="account.address">
            <button type="submit">Rescan Account</button>
          </form>
          <p>
            <button type="submit" @click="deactivateAccount(account.address)">Deactivate Account</button>
          </p>
        </li>
      </ul>
    </p>
  </section>
  <section v-if="accountData?.api?.inactive">
    <h2>Inactive Accounts</h2>
    <p>
      <ul>
        <li v-for="account in accountData.api.inactive" :key="account.address">
          <p>
            {{ account.address }}
          </p>
          <p>
            Height: {{ account.scan_height }}
          </p>
          <button type="submit" @click="reactivateAccount(account.address)">Reactivate Account</button>
        </li>
      </ul>
    </p>
  </section>
</template>
<script setup lang="ts">
    const { pending, data: accountData, refresh } = useLazyFetch('/api/list-accounts')

    const deactivateAccount = async (address: string) => {
        useFetch(`/api/deactivate-account/${address}`)
        refresh()
    }

    const reactivateAccount = async (address: string) => {
        useFetch(`/api/reactivate-account/${address}`)
        refresh()
    }

    const rescanForm = async (event: any) => {
        const formData = new FormData(event.target)
        const address = formData.get('address')
        const rescanHeight = formData.get('rescanHeight')
        useFetch('/api/rescan-account', {
            method: 'POST',
            body: JSON.stringify({
                address: address,
                height: rescanHeight
            })
        })
        refresh()
    }

    setInterval(() => {
        refresh()
    }, 10000)
</script>