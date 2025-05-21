<template>
  <div class="container-fluid bg-light min-vh-100 py-4">
    <div class="d-flex justify-content-between mb-3">
      <h1 class="text-primary">Update Patient Medical Record</h1>
    </div>
    
    <p class="text-muted mb-4">Click the tabs to view and edit patient medical details</p>
    
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="saveMedicalRecord">
          <div v-if="investigations.length" class="mb-4">
            <h4 class="text-primary mb-3">Investigations</h4>
            <div class="row row-cols-1 row-cols-md-4 g-3">
              <div v-for="investigation in investigations" :key="investigation.id" class="col">
                <div class="form-check">
                  <input 
										:id="'investigation-' + investigation.id"
										v-model="selectedInvestigations[investigation.id]"
                    class="form-check-input" 
                    type="checkbox"  
                  >
                  <label class="form-check-label" :for="'investigation-' + investigation.id">
                    {{ investigation.title }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <hr>
          
          <div class="row mb-4">
            <div class="col-md-6">
              <h4 class="text-primary mb-3">CT Scan</h4>
              <div class="form-floating">
                <select id="ctScan" v-model="ctScan" class="form-select">
                  <option value="" selected>*Specify</option>
                  <option value="brain">Brain</option>
                  <option value="chest">Chest</option>
                  <option value="abdomen">Abdomen</option>
                  <option value="pelvis">Pelvis</option>
                  <option value="spine">Spine</option>
                </select>
                <label for="ctScan">*Specify</label>
              </div>
            </div>
            <div class="col-md-6">
              <h4 class="text-primary mb-3">MRI</h4>
              <div class="form-floating">
                <select id="mri" v-model="mri" class="form-select">
                  <option value="" selected>*Specify</option>
                  <option value="brain">Brain</option>
                  <option value="spine">Spine</option>
                  <option value="joints">Joints</option>
                  <option value="abdomen">Abdomen</option>
                  <option value="pelvis">Pelvis</option>
                </select>
                <label for="mri">*Specify</label>
              </div>
            </div>
          </div>
          
          <div class="d-flex justify-content-end">
            <button type="submit" class="btn btn-primary px-4">Save and Send</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Investigation {
  id: string
  title: string
}

const investigations = ref<Investigation[]>([])
const selectedInvestigations = reactive<Record<string, boolean>>({})
const ctScan = ref('')
const mri = ref('')

const fetchInvestigations = async () => {
  try {
    const res = await GqlGetInvestigations()
    investigations.value = res.investigations
    
    investigations.value.forEach(inv => {
      selectedInvestigations[inv.id] = false
    })
  } catch (err) {
    console.error('Error fetching investigations:', err)
  }
}

const saveMedicalRecord = async () => {
  try {
    const selectedIds = Object.entries(selectedInvestigations)
      .filter(([_, isSelected]) => isSelected)
      .map(([id]) => id.toString())
 
    const result = await GqlSaveInvestigation({
      investigations: selectedIds,
      ctscan: ctScan.value || "Not specified",
      mri: mri.value || "Not specified",
      developer: "cjustinobi",
    });
    
    console.log('Record saved:', result)
  } catch (error) {
    console.error('Error saving record:', error)
  }
}

onMounted(async () => {
  await fetchInvestigations()
})

</script>

<style scoped>

</style>