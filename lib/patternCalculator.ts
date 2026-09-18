export interface PatternDimensions { length:number; chestWidth:number; sleeveLength:number; shoulders?:number; backOpen?:number }
export interface TechnicalPattern { seamAllowance:number; totalFabricRequired:number; vectors:{ frontPiece:string; backPiece:string } }
export function calculatePatterns(dims:PatternDimensions, fabricStiffness:number): TechnicalPattern{
  const shrinkageFactor = 1 + (1 - fabricStiffness) * 0.03
  const finalLength = dims.length * shrinkageFactor
  const finalWidth = dims.chestWidth * shrinkageFactor
  const frontPiecePath = `M 0 0 L ${finalWidth} 0 L ${finalWidth} ${finalLength} L 0 ${finalLength} Z`
  const backPiecePath = `M 0 0 L ${finalWidth} 0 L ${finalWidth} ${finalLength-2} L 0 ${finalLength-2} Z`
  const totalFabric = ((finalLength*2)+ (dims.sleeveLength||60))/100
  return { seamAllowance:1.5, totalFabricRequired: parseFloat(totalFabric.toFixed(2)), vectors:{ frontPiece:frontPiecePath, backPiece:backPiecePath } }
}
