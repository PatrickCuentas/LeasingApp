const mainVariants = {
	withResults: {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			height: "auto"
		},
	},
	withoutResults: {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			height: "100%",
		},
	},
}

const initialResultsVariants = {
	opacity: 0,
}

const animateResultsVariants = {
	opacity: 1,
}

export {
	mainVariants,
	initialResultsVariants,
	animateResultsVariants
}