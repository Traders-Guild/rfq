import * as anchor from '@project-serum/anchor';
import { Program, Provider } from '@project-serum/anchor';
import { Rfq } from '../target/types/rfq';
import * as assert from 'assert';
import * as idl from '../target/idl/rfq.json';
import * as spl from "@solana/spl-token";
import {
  Connection,
  Keypair,
  PublicKey,
  Signer,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";

describe('rfq', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const provider = anchor.getProvider();
  const program = anchor.workspace.Rfq as Program<Rfq>;

  it('Initializes RFQs', async () => {
    const feeDenominator = 1_000;
    const feeNumerator = 3;
    const { tx, state } = await initializeProtocol(provider, feeDenominator, feeNumerator);
    assert.ok(state.rfqCount.eq(new anchor.BN(0)));
    console.log("Your transaction signature");

  });

  it('Initializes new RFQ', async () => {

  })

  it('Places new limit orders', async () => {

  })

  

});


export async function initializeRFQ(
  provider: Provider,
  action: boolean,
  instrument: number,
  rfqExpiry: anchor.BN,
  strike: anchor.BN,
  ratio: number,
  nOfLegs, number
): Promise<any> {
  
  const program = await getProgram(provider);
  console.log("program", program.programId);
  const [globalPDA, _globalBump] = await getPda(provider, 'convergence_rfq');
  const [rfqPDA, _rfqBump] = await getPda(provider, 'rfq_state');
  const [orderBookPDA, _orderBookBump] = await getPda(provider, 'order_book_state');

  const tx = await program.rpc.initializeRfq(
    action, 
    instrument,
    rfqExpiry,
    strike,
    ratio,
    nOfLegs,
  {
    accounts: {
      authority: provider.wallet.publicKey,
      rfqState: rfqPDA,
      orderBookState:orderBookPDA,
      globalState: globalPDA,
      systemProgram: anchor.web3.SystemProgram.programId,
      tokenProgram: spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      
    }
  });

  const state = await program.account.globalState.fetch(globalPDA)
  return { tx, state };
}

export async function initializeProtocol(
  provider: Provider,
  feeDenominator: number,
  feeNumerator: number
): Promise<any> {

  const program = await getProgram(provider);
  console.log("program", program.programId);
  const [protocolPda, _protocolBump] = await getPda(provider, 'convergence_rfq');
  const tx = await program.rpc.initialize(new anchor.BN(feeDenominator), new anchor.BN(feeNumerator), {
    accounts: {
      authority: provider.wallet.publicKey,
      protocol: protocolPda,
      systemProgram: anchor.web3.SystemProgram.programId
    }
  });
  const state = await program.account.globalState.fetch(protocolPda)
  return { tx, state };
}

export async function getPda(provider: any, seed: string): Promise<any> {
  const program = await getProgram(provider);
  const [protocolPda, protocolBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode(seed))],
    program.programId
  );
  return [protocolPda, protocolBump];
}

export async function getProgram(provider: Provider): Program<Rfq> {
  const programId = new anchor.web3.PublicKey(idl.metadata.address);
  // @ts-ignoreå
  return new anchor.Program(idl, programId, provider);
}

export const toBuffer = (x: any) => {
  console.log("Fuck fuck", x);
  return Buffer.from(anchor.utils.bytes.utf8.encode(x));
}

 // 1. initialize new RFQ ecosystem
  // 2. create a new RFQ 
  // 3. wallet A posts a new limit order in the created RFQ
  // 4. wallet B posts a new limit order in the created RFQ
  // 5. wallet C places a market order in the created RFQ 
  // 6. wallet A settles
  // 7. wallet B settles
  // 8. wallet C settles