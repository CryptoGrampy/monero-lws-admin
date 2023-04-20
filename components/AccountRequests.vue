
  <template>
    <section v-if="creationRequestsData?.api.create && creationRequestsData?.api.create.length > 0">
    <h2>Account Creation Requests:</h2>
   <button @click="useFetch('/api/accept-requests')">Accept All Requests</button>
    <p>
      <ul>
        <li v-for="request in creationRequestsData.api.create" :key="request.address">
          <p>
            Address: {{ request.address }}
          </p>
          <p>
            Start Height: {{ request.start_height }}
          </p>
          <p>
            <button @click="acceptRequest(request.address)">Accept Request</button>
            <button @click="rejectRequest(request.address)">Reject Request</button>
          </p>
        </li>
      </ul>
    </p>
  </section>
  </template>
    <script setup lang="ts">
    const { pending, data: creationRequestsData, refresh } = useLazyFetch('/api/list-requests')

    const acceptRequest = async (address: string) => {
        useFetch(`/api/accept-request/${address}`)
        refresh()
    }

    const rejectRequest = async (address: string) => {
        useFetch(`/api/reject-request/${address}`)
        refresh()
    }

    setInterval(() => {
        refresh()
    }, 10000)
    </script>