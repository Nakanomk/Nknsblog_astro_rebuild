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

	const categoryIds = [
		...categoryOrder,
		...Object.keys(grouped)
			.filter((id) => !categoryOrder.includes(id))
			.sort()
	].filter((id) => grouped[id]?.length)

	return categoryIds.map((id) => ({
		id,
		title: categoryLabels[id] ?? titleCase(id),
		docs: grouped[id].sort((a, b) => a.data.order - b.data.order)
	}))
}