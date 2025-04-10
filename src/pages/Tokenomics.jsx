import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TokenomicsHero from '../components/tokenomics/TokenomicsHero';
import TokenomicsDistribution from '../components/tokenomics/TokenomicsDistribution';
import RealAssetBacking from '../components/tokenomics/RealAssetBacking';
import NFTUtility from '../components/tokenomics/NFTUtility';
import Liquidity from '../components/tokenomics/Liquidity';
import TrackCNT from '../components/tokenomics/TrackCNT';
import Roadmap from '../components/tokenomics/Roadmap';
import FAQ from '../components/tokenomics/FAQ';

function Tokenomics() {
  return (
    <div className="font-[Poppins]">
      <Header />
      <main className="pt-[88px]">
        <TokenomicsHero />
        <TokenomicsDistribution />
        <RealAssetBacking />
        <NFTUtility />
        <Liquidity />
        <TrackCNT />
        <Roadmap />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

export default Tokenomics; 