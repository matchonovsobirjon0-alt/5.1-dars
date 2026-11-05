import { useEffect, useState } from 'react'

const PRODUCTS_API = 'https://dummyjson.com/products?limit=30'

function App() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadProducts() {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(PRODUCTS_API, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Server javobi: ${response.status}`)
        }

        const data = await response.json()

        if (!Array.isArray(data.products)) {
          throw new Error('API maʼlumotlari kutilgan formatda emas')
        }

        setProducts(data.products)
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('Serverda Xatolik bor')
          setProducts([])
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [reloadKey])

  const categories = [...new Set(products.map((product) => product.category))]
  const visibleProducts = products.filter((product) => {
    const matchesSearch = `${product.title} ${product.description}`
      .toLowerCase()
      .includes(search.trim().toLowerCase())
    const matchesCategory = category === 'all' || product.category === category

    return matchesSearch && matchesCategory
  })

  return (
    <main className="mx-auto min-h-screen w-[calc(100%-2.25rem)] max-w-300 bg-[#fbfaf7] font-sans text-[#24231f] sm:w-[calc(100%-5rem)]">
      <header className="flex h-17 items-center justify-between border-b border-[#e9e7e0] sm:h-20.5">
        <a className="inline-flex items-center gap-2.25 text-2xl font-extrabold tracking-[-1.5px]" href="#" aria-label="Nexa bosh sahifasi">
          <span className="grid size-7.5 place-items-center rounded-[50%_50%_50%_8px] bg-[#24231f] text-[19px] font-bold leading-none tracking-[-1px] text-white">n</span>
          <span>nexa<span className="text-[#c65b3b]">.</span></span>
        </a>
        <span className="flex items-center gap-2.25 text-xs text-[#68665f]">
          <span className="size-1.75 rounded-full bg-[#70a278] shadow-[0_0_0_4px_#70a27820]" /> Online katalog
        </span>
      </header>

      <section className="relative mt-4.25 flex min-h-87.5 items-center overflow-hidden rounded-[5px] bg-[#f0eee7] px-[7%] py-9 sm:mt-6.25 sm:min-h-101.25 sm:px-[8.3%] sm:py-12">
        <div className="relative z-10 w-full sm:w-[58%]">
          <p className="mb-3.75 text-[10px] font-bold tracking-[1.8px] text-[#c65b3b]">SIZ UCHUN TANLANDI</p>
          <h1 className="text-[clamp(35px,8vw,47px)] font-semibold leading-[1.12] tracking-[-2.5px] sm:text-[clamp(38px,5vw,58px)] sm:tracking-[-3.4px]">
            Yaxshi tanlov,<br /><span className="text-[#c65b3b]">yaxshi kayfiyat.</span>
          </h1>
          <p className="mb-6.25 mt-4.25 max-w-87.5 text-[13px] leading-[1.8] text-[#77746d]">
            Kundalik hayotingizga kerakli mahsulotlarni bir joyda kashf eting.
          </p>
          <a className="inline-flex items-center gap-5 border-b border-[#24231f] pb-1.75 text-xs font-bold" href="#catalog">
            Katalogni ko‘rish <span className="text-base" aria-hidden="true">↓</span>
          </a>
        </div>
        <div className="pointer-events-none absolute -right-24.5 top-[63%] h-70 w-67.5 -translate-y-1/2 scale-[.65] opacity-[.27] sm:-right-13 sm:top-1/2 sm:scale-[.78] sm:opacity-80 md:right-[12%] md:scale-100" aria-hidden="true">
          <div className="absolute left-5 top-6 size-57.5 rounded-full bg-[#d7b6a7]" />
          <div className="absolute left-19 top-9.75 h-51.25 w-38.75 rotate-13 rounded-[100px_100px_8px_8px] border border-white/50 bg-[#d49b7b] shadow-[0_24px_48px_#6d4b3b24]">
            <span className="absolute left-16.25 top-11.25 text-[40px] text-[#f4e3d8]">✦</span>
          </div>
          <div className="absolute left-14 top-9.25 h-51.25 w-38.75 -rotate-2 overflow-hidden rounded-[100px_100px_8px_8px] border border-white/50 bg-linear-to-br from-[#d59a78] via-[#bd7359] to-[#a95445] shadow-[0_24px_48px_#6d4b3b24]">
            <span className="absolute -left-11.25 top-20 size-43.75 rounded-full border border-[#ffede063]" />
            <span className="absolute left-11.5 top-13.25 size-26.5 rounded-full border border-[#ffede063]" />
            <span className="absolute right-8.25 top-8.5 text-2xl text-[#f4dfca]">✳</span>
            <span className="absolute bottom-7 left-6.75 font-medium leading-[1.3] tracking-[.5px] text-[#f9e9dc]">
              a little<br />something<br /><b className="font-extrabold">special.</b>
            </span>
          </div>
          <span className="absolute right-4.25 top-4.25 text-[22px] text-[#fff7ec]">✦</span>
          <span className="absolute bottom-3 left-3 text-[28px] text-[#fff7ec]">✧</span>
        </div>
        <div className="absolute bottom-4.25 right-4.5 text-[10px] tracking-[1px] text-[#9c9991] sm:bottom-6.75 sm:right-8.75">
          <span className="font-bold text-[#24231f]">01</span> / 03
        </div>
      </section>

      <section className="py-13.75 sm:py-18.25" id="catalog">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end sm:gap-5">
          <div>
            <p className="mb-2.25 text-[10px] font-bold tracking-[1.8px] text-[#c65b3b]">BIZNING TO‘PLAM</p>
            <h2 className="text-[clamp(25px,3vw,34px)] font-semibold leading-tight tracking-[-1.7px]">
              Ommabop mahsulotlar<span className="text-[#c65b3b]">.</span>
            </h2>
          </div>
          <p className="mb-1.25 text-[11px] text-[#89877f]">
            {isLoading
              ? 'Yuklanmoqda...'
              : error
                ? 'Katalog vaqtincha mavjud emas'
                : `${visibleProducts.length} ta mahsulot`}
          </p>
        </div>

        <div className="my-6.25 flex flex-col gap-3 sm:mt-7 sm:flex-row">
          <label className="flex h-10.75 flex-1 items-center gap-2.5 border border-[#e9e7e0] bg-white px-3.25">
            <svg className="size-4 shrink-0 fill-none stroke-[#89877f] stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m16 16 4 4" /></svg>
            <input
              className="w-full border-0 bg-transparent text-xs text-[#24231f] outline-none placeholder:text-[#a6a39c]"
              type="search"
              placeholder="Mahsulot qidirish..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Mahsulot qidirish"
            />
          </label>
          <label className="relative flex h-10.75 w-full items-center border border-[#e9e7e0] bg-white px-3 sm:w-52.5">
            <span className="sr-only">Kategoriya</span>
            <select
              className="h-full w-full appearance-none border-0 bg-transparent text-[11px] capitalize text-[#5a5852] outline-none disabled:opacity-60"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={isLoading || Boolean(error)}
            >
              <option value="all">Barcha kategoriyalar</option>
              {categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <svg className="pointer-events-none size-4 fill-none stroke-[#89877f] stroke-[1.6]" viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" /></svg>
          </label>
        </div>

        {isLoading ? (
          <div role="status" aria-live="polite">
            <div className="mb-5 flex items-center gap-3 rounded-sm border border-[#eadfd8] bg-[#f7f3ed] px-4 py-3.5 sm:mb-6 sm:px-5">
              <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-white">
                <span className="absolute inset-0 animate-spin rounded-full border-2 border-[#eadfd8] border-t-[#c65b3b]" />
                <span className="size-2 rounded-full bg-[#c65b3b]" />
              </span>
              <span>
                <span className="block text-xs font-bold text-[#24231f] sm:text-sm">Mahsulotlar tayyorlanmoqda</span>
                <span className="mt-1 block text-[10px] text-[#89877f] sm:text-[11px]">Bir oz kuting, katalog hozir yuklanadi...</span>
              </span>
              <span className="ml-auto hidden items-center gap-1.5 text-[9px] font-semibold tracking-[1px] text-[#c65b3b] sm:flex">
                <span className="size-1.5 animate-pulse rounded-full bg-[#c65b3b]" />
                YUKLANMOQDA
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6.25" aria-label="Mahsulotlar yuklanmoqda">
            {Array.from({ length: 6 }, (_, index) => (
              <div className="overflow-hidden border border-[#eeece6] bg-white" key={index}>
                <div className="relative mb-4.25 h-36.25 overflow-hidden bg-[#f5f3ed] sm:h-54.5">
                  <div className="absolute inset-0 animate-pulse bg-linear-to-br from-[#f5f3ed] via-[#eeece4] to-[#f5f3ed]" />
                  <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border border-[#e6e1d8] bg-white/70 sm:size-24" />
                  <div className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-[#e9e4da] sm:size-12" />
                </div>
                <div className="px-3 pb-4 sm:px-4">
                  <div className="mb-3 flex justify-between">
                    <div className="h-2 w-14 animate-pulse rounded-full bg-[#eeece6]" />
                    <div className="h-2 w-8 animate-pulse rounded-full bg-[#eeece6]" />
                  </div>
                  <div className="mb-2.5 h-3 w-[78%] animate-pulse rounded-full bg-[#eeece6]" />
                  <div className="mb-1.5 h-2 w-full animate-pulse rounded-full bg-[#f2f0eb]" />
                  <div className="mb-4 h-2 w-[62%] animate-pulse rounded-full bg-[#f2f0eb]" />
                  <div className="flex items-center justify-between border-t border-[#f0eee9] pt-3">
                    <div className="h-3 w-12 animate-pulse rounded-full bg-[#e9e4da]" />
                    <div className="size-7 animate-pulse rounded-full bg-[#eeece6]" />
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        ) : error ? (
          <div className="flex min-h-67.5 flex-col items-center justify-center border border-[#e9e7e0] bg-white px-5 py-8.75 text-center" role="alert">
            <div className="mb-4.5 grid size-10.75 place-items-center rounded-full bg-[#f8eee9] text-[22px] font-bold text-[#c65b3b]">!</div>
            <p className="mb-2 text-[10px] font-bold tracking-[1.8px] text-[#c65b3b]">NIMADIR XATO KETDI</p>
            <h3 className="text-lg font-bold">{error}</h3>
            <p className="mt-2.25 max-w-97.5 text-xs leading-[1.7] text-[#89877f]">
              Maʼlumotlarni hozircha yuklab bo‘lmadi. Internet aloqasini tekshirib, qayta urinib ko‘ring.
            </p>
            <button
              className="mt-5 inline-flex items-center gap-3.75 bg-[#24231f] px-4 py-2.75 text-[11px] text-white transition-colors hover:bg-[#c65b3b]"
              onClick={() => setReloadKey((key) => key + 1)}
            >
              Qayta urinish <span aria-hidden="true">↗</span>
            </button>
          </div>
        ) : visibleProducts.length ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-6.25">
            {visibleProducts.map((product, index) => (
              <article className="group min-w-0 overflow-hidden border border-[#eeece6] bg-white transition duration-200 hover:-translate-y-1 hover:shadow-[0_14px_35px_#24231f0d]" key={product.id}>
                <div className="relative grid h-36.25 place-items-center overflow-hidden bg-[#f5f3ed] sm:h-54.5">
                  <img
                    className="size-full object-contain p-3.25 mix-blend-multiply transition duration-300 group-hover:scale-105 sm:p-5.5"
                    src={product.thumbnail}
                    alt={product.title}
                    loading={index > 5 ? 'lazy' : 'eager'}
                  />
                  {index < 3 && <span className="absolute left-1.75 top-2 bg-[#c65b3b] px-1.25 py-1.25 text-[7px] font-bold tracking-[.8px] text-white sm:left-3.25 sm:top-3.25 sm:px-2 sm:text-[8px]">TOP TANLOV</span>}
                  <span className="absolute bottom-2.5 right-3 text-[9px] text-[#aaa69d]">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="p-[13px_11px_11px] sm:p-4">
                  <div className="flex items-center justify-between gap-2 text-[9px] text-[#96938b]">
                    <span className="capitalize">{product.category.replaceAll('-', ' ')}</span>
                    <span className="whitespace-nowrap text-[#77746d]"><span className="text-[#d29a42]" aria-hidden="true">★</span> {product.rating}</span>
                  </div>
                  <h3 className="mt-2.5 mb-1.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs font-bold leading-[1.4] sm:text-sm">{product.title}</h3>
                  <p className="line-clamp-2 h-8.5 overflow-hidden text-[9px] leading-[1.7] text-[#89877f] sm:text-[10px]">{product.description}</p>
                  <div className="mt-3.25 flex items-center justify-between border-t border-[#f0eee9] pt-2.75">
                    <p className="m-0 font-bold sm:text-[15px]">${product.price.toFixed(2)}</p>
                    <span className="grid size-6.75 place-items-center rounded-full bg-[#24231f] text-xs text-white" aria-label={`${product.title} haqida batafsil`}>↗</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-67.5 flex-col items-center justify-center border border-[#e9e7e0] bg-white px-5 py-8.75 text-center">
            <div className="mb-4.5 grid size-10.75 place-items-center rounded-full bg-[#f8eee9] text-[22px] text-[#c65b3b]">⌕</div>
            <p className="mb-2 text-[10px] font-bold tracking-[1.8px] text-[#c65b3b]">NATIJALAR TOPILMADI</p>
            <h3 className="text-lg font-bold">Boshqa so‘z bilan qidirib ko‘ring.</h3>
            <p className="mt-2.25 text-xs leading-[1.7] text-[#89877f]">Qidiruv yoki kategoriya tanlovini o‘zgartiring.</p>
          </div>
        )}
      </section>

      <footer className="flex min-h-18.75 flex-wrap items-center justify-between gap-5 border-t border-[#e9e7e0] py-4.5 text-[10px] text-[#96938b]">
        <a className="inline-flex items-center gap-2.25 text-lg font-extrabold tracking-[-1.5px] text-[#24231f]" href="#" aria-label="Nexa bosh sahifasi">
          <span className="grid size-6 place-items-center rounded-[50%_50%_50%_8px] bg-[#24231f] text-[15px] font-bold leading-none text-white">n</span>
          <span>nexa<span className="text-[#c65b3b]">.</span></span>
        </a>
        <span className="hidden sm:inline">Oddiy tanlov. Yaxshi kayfiyat.</span>
        <span>© 2025 NEXA STUDIO</span>
      </footer>
    </main>
  )
}

export default App
