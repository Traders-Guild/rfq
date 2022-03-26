import * as anchor from '@project-serum/anchor';
import * as dotenv from 'dotenv';

import * as idl from './idl/rfq.json';

export async function getPda(provider: any, seed: string): Promise<any> {
  const program = await getProgram(provider);
  const [protocolPda, protocolBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode(seed))],
    program.programId
  );
  return [protocolPda, protocolBump];
};

export async function getProgram(provider: anchor.Provider): Promise<any> {
  const programId = new anchor.web3.PublicKey(idl.metadata.address);
  // @ts-ignore
  return new anchor.Program(idl, programId, provider);
};

export const toBuffer = (x: any) => {
  console.log("boogie woogie: ", x);
  return Buffer.from(anchor.utils.bytes.utf8.encode(x));
};

export async function getLiveRFQs(provider: anchor.Provider): Promise<any> {
  const program = await getProgram(provider);
  const [protocolPda, _protocolBump] = await getPda(provider, 'convergence_rfq');
  const protocol = await program.account.protocol.fetch(protocolPda);
  return protocol.titles;
};