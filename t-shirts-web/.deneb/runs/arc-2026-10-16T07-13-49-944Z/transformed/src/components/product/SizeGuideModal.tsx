'use client';
import { useSiteData } from "@deneb-ui/ui";

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { FitType } from '@/types/store';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  fit: FitType;
}

export function SizeGuideModal({ isOpen, onClose, fit }: SizeGuideModalProps) {
  const siteData = useSiteData();
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const measurements = {
    cm: [
      { size: 'XS', chest: '96 - 100', length: '71', shoulder: '47', sleeve: '21' },
      { size: 'S', chest: '102 - 106', length: '73', shoulder: '49', sleeve: '22' },
      { size: 'M', chest: '108 - 112', length: '75', shoulder: '51', sleeve: '23' },
      { size: 'L', chest: '114 - 118', length: '77', shoulder: '53', sleeve: '24' },
      { size: 'XL', chest: '120 - 124', length: '79', shoulder: '55', sleeve: '25' },
      { size: 'XXL', chest: '126 - 130', length: '81', shoulder: '57', sleeve: '26' },
    ],
    in: [
      { size: 'XS', chest: '37.8 - 39.4', length: '28.0', shoulder: '18.5', sleeve: '8.3' },
      { size: 'S', chest: '40.2 - 41.7', length: '28.7', shoulder: '19.3', sleeve: '8.7' },
      { size: 'M', chest: '42.5 - 44.1', length: '29.5', shoulder: '20.1', sleeve: '9.1' },
      { size: 'L', chest: '44.9 - 46.5', length: '30.3', shoulder: '20.9', sleeve: '9.4' },
      { size: 'XL', chest: '47.2 - 48.8', length: '31.1', shoulder: '21.7', sleeve: '9.8' },
      { size: 'XXL', chest: '49.6 - 51.2', length: '31.9', shoulder: '22.4', sleeve: '10.2' },
    ],
  };

  const getFitAdvice = (f: FitType) => {
    switch (f) {
      case 'oversized':
        return 'Cut with exaggerated dropped shoulders, wider sleeve profile, and a boxy relaxed drape. Designed to sit loose on the body. We recommend taking your normal size for the intended oversized look, or sizing down one size for a tailored classic silhouette.';
      case 'performance':
        return 'Athletic ergonomic silhouette tailored close through the chest and shoulders with generous overhead clearance. Stretches with dynamic movement. Order true to size for athletic training, or size up for relaxed lifestyle wear.';
      case 'classic':
      default:
        return 'Timeless proportioned cut through chest, waist, and arms. Structured 1.25" bound collar sits flush against the neck. Fits true to size with clean lines.';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0B0B0B] border border-white/10 text-white p-6 md:p-8 shadow-2xl z-10 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span
              className="text-[10px] tracking-[0.25em] uppercase text-[#D72626] font-semibold"
              data-preview-field-path="home.fitSizingSpecificationsLabel"
              data-preview-style-target="home.fitSizingSpecificationsLabel"
              data-preview-style-type="text">{siteData?.content?.home?.fitSizingSpecificationsLabel ?? "Fit & Sizing Specifications"}</span>
            <h3
              className="text-xl md:text-2xl font-light uppercase tracking-tight text-white mt-1"
              data-preview-field-path="home.garmentMeasurementsGuideSubheading"
              data-preview-style-target="home.garmentMeasurementsGuideSubheading"
              data-preview-style-type="text">{siteData?.content?.home?.garmentMeasurementsGuideSubheading ?? "Garment Measurements Guide"}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white transition-colors border border-white/10 hover:border-white/30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fit Note */}
        <div className="my-6 p-4 bg-stone-900/60 border-l-2 border-[#D72626]">
          <span
            className="text-xs uppercase font-medium tracking-wider text-stone-300 block mb-1"
            data-preview-field-path="home.silhouetteProfileFitLabel"
            data-preview-style-target="home.silhouetteProfileFitLabel"
            data-preview-style-type="text">{siteData?.content?.home?.silhouetteProfileFitLabel ?? "Silhouette Profile: FIT"}{fit.toUpperCase()} FIT
          </span>
          <p className="text-xs text-stone-400 leading-relaxed font-light">
            {getFitAdvice(fit)}
          </p>
          <div className="mt-3 flex items-center gap-2 text-[11px] text-stone-300">
            <Check className="w-3.5 h-3.5 text-[#D72626]" />
            <span
              data-preview-field-path="home.campaignModel621882"
              data-preview-style-target="home.campaignModel621882"
              data-preview-style-type="text">{siteData?.content?.home?.campaignModel621882 ?? "Campaign Model is 6'2\" (188 cm), 84 kg wearing size Large"}</span>
          </div>
        </div>

        {/* Unit Selector */}
        <div className="flex items-center justify-between mb-4">
          <span
            className="text-xs tracking-wider uppercase text-stone-400"
            data-preview-field-path="home.measurementsLabel"
            data-preview-style-target="home.measurementsLabel"
            data-preview-style-type="text">{siteData?.content?.home?.measurementsLabel ?? "Measurements"}</span>
          <div className="inline-flex border border-white/15 p-0.5 bg-black">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs uppercase tracking-wider font-medium transition-colors ${
                unit === 'cm'
                  ? 'bg-white text-black font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
              data-preview-field-path="home.cmLabel"
              data-preview-style-target="home.cmLabel"
              data-preview-style-type="button">{siteData?.content?.home?.cmLabel ?? "CM"}</button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs uppercase tracking-wider font-medium transition-colors ${
                unit === 'in'
                  ? 'bg-white text-black font-semibold'
                  : 'text-stone-400 hover:text-white'
              }`}
              data-preview-field-path="home.inchesLabel"
              data-preview-style-target="home.inchesLabel"
              data-preview-style-type="button">{siteData?.content?.home?.inchesLabel ?? "INCHES"}</button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/15 text-stone-400 uppercase tracking-widest text-[11px]">
                <th
                  className="py-3 px-3"
                  data-preview-field-path="home.size"
                  data-preview-style-target="home.size"
                  data-preview-style-type="text">{siteData?.content?.home?.size ?? "Size"}</th>
                <th
                  className="py-3 px-3"
                  data-preview-field-path="home.chestWidth"
                  data-preview-style-target="home.chestWidth"
                  data-preview-style-type="text">{siteData?.content?.home?.chestWidth ?? "Chest Width"}</th>
                <th
                  className="py-3 px-3"
                  data-preview-field-path="home.bodyLength"
                  data-preview-style-target="home.bodyLength"
                  data-preview-style-type="text">{siteData?.content?.home?.bodyLength ?? "Body Length"}</th>
                <th
                  className="py-3 px-3"
                  data-preview-field-path="home.shoulder"
                  data-preview-style-target="home.shoulder"
                  data-preview-style-type="text">{siteData?.content?.home?.shoulder ?? "Shoulder"}</th>
                <th
                  className="py-3 px-3"
                  data-preview-field-path="home.sleeveLength"
                  data-preview-style-target="home.sleeveLength"
                  data-preview-style-type="text">{siteData?.content?.home?.sleeveLength ?? "Sleeve Length"}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-stone-300">
              {measurements[unit].map((row: any) => (
                <tr key={row.size} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-3 font-sans font-medium text-white">{row.size}</td>
                  <td className="py-3.5 px-3">{row.chest}</td>
                  <td className="py-3.5 px-3">{row.length}</td>
                  <td className="py-3.5 px-3">{row.shoulder}</td>
                  <td className="py-3.5 px-3">{row.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure */}
        <div className="mt-8 pt-6 border-t border-white/10 text-xs text-stone-400 space-y-2">
          <span
            className="uppercase text-[11px] font-medium tracking-wider text-stone-300 block mb-2"
            data-preview-field-path="home.howMeasureLabel"
            data-preview-style-target="home.howMeasureLabel"
            data-preview-style-type="text">{siteData?.content?.home?.howMeasureLabel ?? "How to Measure"}</span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
            <div>
              <span
                className="text-white font-medium"
                data-preview-field-path="home.chestLabel"
                data-preview-style-target="home.chestLabel"
                data-preview-style-type="text">{siteData?.content?.home?.chestLabel ?? "Chest:"}</span> <span
                data-preview-field-path="home.measureAroundFullestPartChest"
                data-preview-style-target="home.measureAroundFullestPartChest"
                data-preview-style-type="text">{siteData?.content?.home?.measureAroundFullestPartChest ?? "Measure around the fullest part of your chest, keeping tape horizontal under arms."}</span>
            </div>
            <div>
              <span
                className="text-white font-medium"
                data-preview-field-path="home.lengthLabel"
                data-preview-style-target="home.lengthLabel"
                data-preview-style-type="text">{siteData?.content?.home?.lengthLabel ?? "Length:"}</span> <span
                data-preview-field-path="home.measureHighestPointShoulderCollar"
                data-preview-style-target="home.measureHighestPointShoulderCollar"
                data-preview-style-type="text">{siteData?.content?.home?.measureHighestPointShoulderCollar ?? "Measure from highest point of shoulder collar seam straight down to bottom hem."}</span>
            </div>
            <div>
              <span
                className="text-white font-medium"
                data-preview-field-path="home.shoulderLabel"
                data-preview-style-target="home.shoulderLabel"
                data-preview-style-type="text">{siteData?.content?.home?.shoulderLabel ?? "Shoulder:"}</span> <span
                data-preview-field-path="home.measureStraightAcrossBackShoulder"
                data-preview-style-target="home.measureStraightAcrossBackShoulder"
                data-preview-style-type="text">{siteData?.content?.home?.measureStraightAcrossBackShoulder ?? "Measure straight across back from shoulder tip seam to shoulder tip seam."}</span>
            </div>
            <div>
              <span
                className="text-white font-medium"
                data-preview-field-path="home.sleeveLabel"
                data-preview-style-target="home.sleeveLabel"
                data-preview-style-type="text">{siteData?.content?.home?.sleeveLabel ?? "Sleeve:"}</span> <span
                data-preview-field-path="home.measureShoulderSeamDownOuter"
                data-preview-style-target="home.measureShoulderSeamDownOuter"
                data-preview-style-type="text">{siteData?.content?.home?.measureShoulderSeamDownOuter ?? "Measure from shoulder seam down outer edge to sleeve hem opening."}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
