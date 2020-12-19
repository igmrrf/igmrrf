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

export const colorPulse = keyframes`
 0% {
  background-color: #FF4136;
 }
 25% {
   background-color: lightblue;
 }
 50% {
   background-color: blue;
 }
 75% {
   background-color: lightblue;
 }
 100%{
   background-color: darkblue;
 }

`;
