"use client"

import { useState } from "react"
import { Breadcrumb } from "@/components/breadcrumb"
import { ProductImage } from "@/components/product-image"
import { ActionButtons } from "@/components/action-buttons"
import { PromoBanner } from "@/components/promo-banner"
import { FeatureList } from "@/components/feature-list"
import { FreeAddOns } from "@/components/free-addons"
import { ToggleGroup } from "@/components/toggle-group"
import { CommitmentPlanCard, type CommitmentPlan } from "@/components/commitment-plan-card"
import { NumberSelector } from "@/components/number-selector"
import { QuantityStepper } from "@/components/quantity-stepper"
import { PriceDisplay } from "@/components/price-display"
import { CTAButtons } from "@/components/cta-buttons"

// ---- Static data ----
const breadcrumbItems = [
  { label: "Personal", href: "#" },
  { label: "Mobile Line Plans", href: "#" },
  { label: "Ma3ak Lines", href: "#" },
  { label: "Ma'ak 80" },
]

const mainFeatures = [
  "Main data bundle: 187.5 GB Internet (Including +25% GB)",
  "Free 5G service",
  "Max it rewards",
  "Unlimited minutes & SMS to local networks",
  "International minutes: 1,000 min to Ooredoo Palestine + 300 min call world",
]

const extraFeatures = [
  "Data carry over to the next month",
  "Missed Call Alert",
  "Private Number",
  "Discounts on a wide range of 5G handsets",
  "300 minutes to receive calls while roaming",
]

const addons = [
  {
    name: "TOD",
    logoText: "TOD",
    logoColor: "#E63946",
    description:
      "Watch the top leagues, tournaments, series and movies wherever you are on your mobile with TOD",
  },
  {
    name: "Anghami Plus",
    logoText: "anghami+",
    logoColor: "#7B2FBE",
    description:
      "Stream the hottest hits, trending podcasts, and exclusive music experiences anytime, anywhere with Anghami on your mobile.",
  },
  {
    name: "OSN+",
    logoText: "osn+",
    logoColor: "#003087",
    description:
      "Catch the latest blockbusters, exclusive series, and Hollywood hits wherever you go with OSN+ on your mobile.",
  },
]

const commitmentPlans: CommitmentPlan[] = [
  {
    id: "24",
    title: "24 Months Commitment",
    firstMonthPayment: 20.42,
    monthlyFees: 17.04,
    tax: 17.94,
    simCard: 3.02,
    monthlyRecurringFees: 17.22,
  },
  {
    id: "12",
    title: "12 Months Commitment",
    firstMonthPayment: 13.5,
    monthlyFees: 15.0,
    tax: 15.0,
    simCard: 3.02,
    monthlyRecurringFees: 15.0,
  },
]

const phoneNumbers = [
  "+962 776295799",
  "+962 776295800",
  "+962 776295801",
  "+962 776295802",
  "+962 776295803",
]

// ---- Component ----
export function ProductDetailPage() {
  const [lineType, setLineType] = useState("postpaid")
  const [selectedPlan, setSelectedPlan] = useState("24")
  const [simType, setSimType] = useState("sim")
  const [selectedNumber, setSelectedNumber] = useState(phoneNumbers[0])
  const [quantity, setQuantity] = useState(1)

  const activePlan = commitmentPlans.find((p) => p.id === selectedPlan)!
  const totalPrice = activePlan.firstMonthPayment * quantity

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <header className="border-b border-[var(--color-neutral-300)] bg-white sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <span className="text-xl font-bold text-[var(--color-brand)] tracking-tight">
            Ooredoo
          </span>
          <nav className="hidden md:flex items-center gap-6 text-sm text-[var(--color-neutral-700)]">
            <a href="#" className="hover:text-[var(--color-brand)] transition-colors">Personal</a>
            <a href="#" className="hover:text-[var(--color-brand)] transition-colors">Business</a>
            <a href="#" className="hover:text-[var(--color-brand)] transition-colors">Devices</a>
            <a href="#" className="hover:text-[var(--color-brand)] transition-colors">Support</a>
          </nav>
          <button className="text-sm font-semibold text-[var(--color-brand)] hover:underline">
            My Ooredoo
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Breadcrumb */}
        <div className="mb-5">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* Main two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-start">
          {/* LEFT column */}
          <div className="flex flex-col gap-6">
            <ProductImage src="/images/maak-70.png" alt="Ma'ak 70 mobile plan" />

            {/* Extra features below image */}
            <div className="border-t border-[var(--color-neutral-300)] pt-6">
              <FeatureList title="Extra Features" features={extraFeatures} />
            </div>

            <div className="border-t border-[var(--color-neutral-300)] pt-6">
              <FreeAddOns addons={addons} />
            </div>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-5 min-w-0">
            {/* Title + actions */}
            <div>
              <p className="text-sm font-semibold text-[var(--color-brand)] mb-1 uppercase tracking-wide">
                Mobile Line
              </p>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl font-bold text-[var(--color-neutral-900)] text-balance leading-tight">
                  {"Ma'ak 70 Line"}
                </h1>
                <ActionButtons />
              </div>
              <div className="h-px bg-[var(--color-neutral-300)] mb-4" />
            </div>

            {/* Promo */}
            <PromoBanner message="Get Extra 25% GB exclusively from our eShop" />

            {/* Main features */}
            <FeatureList title="Main Features" features={mainFeatures} />

            <div className="h-px bg-[var(--color-neutral-300)]" />

            {/* Line type toggle */}
            <ToggleGroup
              name="line-type"
              label="Choose Line Type"
              options={[
                { label: "Prepaid", value: "prepaid" },
                { label: "Postpaid", value: "postpaid" },
              ]}
              value={lineType}
              onChange={setLineType}
            />

            {/* Commitment plans */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-neutral-500)] mb-3">
                Commitment Plan
              </p>
              <div className="flex gap-3">
                {commitmentPlans.map((plan) => (
                  <CommitmentPlanCard
                    key={plan.id}
                    plan={plan}
                    selected={selectedPlan === plan.id}
                    onSelect={setSelectedPlan}
                  />
                ))}
              </div>
            </div>

            {/* SIM type toggle */}
            <ToggleGroup
              name="sim-type"
              label="Choose SIM Type"
              options={[
                { label: "SIM Card", value: "sim" },
                { label: "eSIM", value: "esim" },
              ]}
              value={simType}
              onChange={setSimType}
            />

            {/* Number selector */}
            <NumberSelector
              numbers={phoneNumbers}
              value={selectedNumber}
              onChange={setSelectedNumber}
            />

            {/* Quantity + price row */}
            <div className="flex items-end justify-between gap-4">
              <QuantityStepper
                label="Quantity"
                value={quantity}
                min={1}
                max={10}
                onChange={setQuantity}
              />
              <PriceDisplay amount={totalPrice} currency="JD" note="Including Tax" align="right" />
            </div>

            {/* CTAs */}
            <CTAButtons />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-neutral-300)] mt-16 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-[13px] text-[var(--color-neutral-500)]">
          &copy; 2026 Ooredoo Jordan. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
