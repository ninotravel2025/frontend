<template>
	<div class="flex flex-col items-center mb-4 bg-white p-6 rounded-lg gap-5 shadow-md" :class="!reverse ? 'md:flex-row': 'md:flex-row-reverse'">
		<div class="md:w-1/2 mb-6 md:mb-0 md:pr-8">
			<h3 class="text-2xl font-semibold text-gray-800 mb-4">{{title}}</h3>
			<p class="text-gray-600">
				<slot></slot>
			</p>
		</div>
		<div class="md:w-1/2 h-full rounded-md">
			<img class="h-auto w-auto rounded-md" :src="image" alt="Notre mission" />
		</div>
	</div>
</template>

<script>

	export default {
		name: "AboutSection",
		props: {
			reverse: {
				type: Boolean,
				default: false
			},
			title: String,
			image: String
		}
	}
</script>
<style></style>