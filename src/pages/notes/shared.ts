import type { CollectionEntry } from 'astro:content'

export type NotesEntry = CollectionEntry<'notes'>

const categoryOrder = ['dm', 'ds', 'csapp', 'blog', 'ml']

const categoryLabels: Record<string, string> = {
	dm: '离散数学',
	ds: '数据结构',
	csapp: 'CSAPP',
	blog: '建站笔记',
	ml: '机器学习',
	Patterson: 'Patterson',
	Verilog: 'Verilog',
	'l&c_design': 'L&C Design'
}

function titleCase(value: string) {
	return value
		.replace(/[-_]+/g, ' ')
		.split(' ')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(' ')
}

export function groupNotesByCategory(notesCollection: NotesEntry[]) {
	const grouped = notesCollection.reduce<Record<string, NotesEntry[]>>((acc, doc) => {
		const categoryId = doc.id.split('/')[0]
		if (!acc[categoryId]) acc[categoryId] = []
		acc[categoryId].push(doc)
		return acc
	}, {})

	// Sort categories by number of documents (descending) so that
	// categories with many chapters appear first, and those with
	// only one or two chapters are pushed to the end.
	const categoryIds = Object.keys(grouped)
		.filter((id) => grouped[id]?.length)
		.sort((a, b) => {
			const lenDiff = grouped[b].length - grouped[a].length
			if (lenDiff !== 0) return lenDiff
			// Fall back to categoryOrder / alphabetical for ties
			const aIdx = categoryOrder.indexOf(a)
			const bIdx = categoryOrder.indexOf(b)
			if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx
			if (aIdx !== -1) return -1
			if (bIdx !== -1) return 1
			return a.localeCompare(b)
		})

	return categoryIds.map((id) => ({
		id,
		title: categoryLabels[id] ?? titleCase(id),
		docs: grouped[id].sort((a, b) => a.data.order - b.data.order)
	}))
}