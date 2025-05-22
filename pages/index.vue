<template>
  <div class="container-fluid min-vh-100 py-4">
    <div class="d-flex justify-content-between mb-3">
      <h1 class="text-primary">Update Patient Medical Record</h1>
    </div>
    
    <p class="text-muted mb-5">Click the tabs to view and edit patient medical details</p>
    
    <div class="card border-0">
      <div class="card-body">
				<div 
					v-if="alertState.show" 
					:class="`alert alert-${alertState.type} alert-dismissible fade show`" 
					role="alert"
					style="position: fixed; top: 80px; right: 20px; z-index: 1050; max-width: 400px;">
					<strong v-if="alertState.type === 'success'">Success!</strong>
					<strong v-else-if="alertState.type === 'danger'">Error!</strong>
					<strong v-else-if="alertState.type === 'warning'">Warning!</strong>
					<strong v-else-if="alertState.type === 'info'">Info!</strong>
					{{ alertState.message }}
				</div>
        <form class="p-5" @submit.prevent="saveMedicalRecord">
          <div v-if="investigations.length" class="mb-4">
            <h4 class="text-primary mb-3">X-Ray</h4>
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
              <p class="mb-3">CT Scan</p>
              <div>
                <select id="ctScan" v-model="ctScan" class="form-select">
                  <option disabled value="" selected>*Specify</option>
                  <option value="brain">Brain</option>
                  <option value="chest">Chest</option>
                  <option value="abdomen">Abdomen</option>
                  <option value="pelvis">Pelvis</option>
                  <option value="spine">Spine</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <p class="mb-3">MRI</p>
              <div>
                <select id="mri" v-model="mri" class="form-select">
                  <option value="" selected>*Specify</option>
                  <option value="brain">Brain</option>
                  <option value="spine">Spine</option>
                  <option value="joints">Joints</option>
                  <option value="abdomen">Abdomen</option>
                  <option value="pelvis">Pelvis</option>
                </select>
              </div>
            </div>
          </div>
          
          <div class="d-flex justify-content-end">
            <button :disabled="loading" type="submit" class="btn text-white px-4"> Save and Send </button>
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
	const loading = ref(false)

	const alertState = reactive({
		show: false,
		type: 'success',
		message: '',
	})

	const showAlert = (type: string, message: string) => {
		alertState.show = true
		alertState.type = type
		alertState.message = message
		
		setTimeout(() => {
			alertState.show = false
		}, 5000)
	}

	const fetchInvestigations = async () => {
		try {
			loading.value = true
			const res = await GqlGetInvestigations()
			investigations.value = res.investigations
			
			investigations.value.forEach(inv => {
				selectedInvestigations[inv.id] = false
			})
			loading.value = false
		} catch (err) {
			showError('Failed to load investigations. Please refresh the page.')
			console.error('Error fetching investigations:', err)
			loading.value = false
		}
	}

	const saveMedicalRecord = async () => {
		loading.value = true
		try {
			const selectedIds = Object.entries(selectedInvestigations)
				.filter(([_, isSelected]) => isSelected)
				.map(([id]) => id.toString())
	
			const result = await GqlSaveInvestigation({
				investigations: selectedIds,
				ctscan: ctScan.value || "Not specified",
				mri: mri.value || "Not specified",
				developer: "cjustinobi",
			})
			showAlert('success', 'Medical record saved successfully!')
			console.log('Record saved:', result)
			loading.value = false
			resetForm()
		} catch (error) {
			showAlert('danger', 'Failed to save medical record. Please try again.')
			console.error('Error saving record:', error)
			loading.value = false
		}
	}

	const resetForm = () => {
  Object.keys(selectedInvestigations).forEach(key => {
    selectedInvestigations[key] = false
  })
  ctScan.value = ''
  mri.value = ''
}

	onMounted(async () => {
		await fetchInvestigations()
	})

</script>

<style scoped>
	.alert {
    position: fixed;
    top: 420px;
    right: 20px;
    z-index: 1000;
    max-width: 400px;
  }
	button {
		background: var(--primary-color) !important;
	}
</style>
