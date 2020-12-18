import { keyframes } from 'styled-components';

export const rotate = keyframes`
 from {
   transform: rotate(0deg);
 }
 to {
   transform: rotate(360deg);
 }
`;

export const pulse = keyframes`
 from{
   transform: scale(0.95);
 }
 to{
   transform: scale(1.05)
 }
`;
