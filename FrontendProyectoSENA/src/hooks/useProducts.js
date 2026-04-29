/** @format */

import { useState, useCallback } from "react"

export const useProducts = () => {
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const API_URL = "http://localhost:3000/api/products"

	const fetchProducts = useCallback(async (signal = null) => {
		setLoading(true)
		try {
			const res = await fetch(API_URL, { signal })
			if (!res.ok) throw new Error(`Error ${res.status}: al obtener productos`)
			const data = await res.json()
			setProducts(data)
			setError(null)
		} catch (err) {
			if (err.name === "AbortError") return
			setError(err.message)
		} finally {
			setLoading(false)
		}
	}, [])

	return { products, loading, error, fetchProducts, API_URL }
}
