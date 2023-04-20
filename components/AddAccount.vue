<template>
  <section>
    <h2>Add Account</h2>
    <form @submit.prevent="addAccount">
      <p>
        <label for="mainAddress">Main Address (Starts with 4): </label>
        <input type="text" id="mainAddress" name="mainAddress" />
      </p>
      <p>
        <label for="viewKey">View Key: </label>
        <input type="text" id="viewKey" name="viewKey"  />
      </p>
      <button type="submit">Add Account</button>
    </form>
  </section>
</template>
<script setup lang="ts">
const addAccount = async (event: any) => {
  const formData = new FormData(event.target);
  const mainAddress = formData.get("mainAddress");
  const viewKey = formData.get("viewKey");
  try {
    const response = await useFetch("/api/add-account/", {
      method: "POST",
      body: JSON.stringify({
        address: mainAddress,
        key: viewKey,
      }),
    });
  } catch (e) {
    console.log(e);
  }
};
</script>
