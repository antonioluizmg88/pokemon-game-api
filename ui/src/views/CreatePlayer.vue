<template>
  <div class="create-player container mx-auto max-w-5xl md:max-w-xl p-4">
    <Card>
      <template #title>Create your player</template>
      <div class="flex flex-col w-full p-4">
        <Input
          v-model="newPlayer.name"
          name="name"
          type="text"
          placeholder="Enter your name"
          @update="test = $event.target.value"
          class="m-2"
        />
        <Dropdown
          v-model="newPlayer.gender"
          :items="genders"
          name="gender"
          placeholder="Enter your gender"
          class="m-2"
        />
        <Input
          v-model="newPlayer.age"
          name="age"
          type="number"
          placeholder="Enter your age"
          min="1"
          class="m-2"
        />
      </div>
      <template #actions>
        <Button @click="createPlayer">Next</Button>
      </template>
    </Card>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: 'CreatePlayer',
  setup() {
    const store = useStore()
    const router = useRouter()
    const genders = {
      M: 'Male',
      F: 'Female',
      O: 'Other',
      X: "I don't want to inform",
    }
    const newPlayer = ref({
      name: null,
      age: null,
      gender: null,
    })
    const createPlayer = async () => {
      const { name, age, gender } = newPlayer.value
      if (!name || !age || !gender) {
        return false
      }

      await store.dispatch('createPlayer', newPlayer.value)
      await router.push({
        name: 'player',
        params: { playerId: store.state.player?._id },
      })
    }

    return {
      createPlayer,
      genders,
      newPlayer,
      players: store.state.players,
    }
  },
}
</script>

<style lang="scss" scoped></style>
