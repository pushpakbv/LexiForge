import { URL, pathToFileURL } from 'node:url';
import { isBuiltin } from 'node:module';

export function resolve(specifier, context, nextResolve) {
  // Handle Windows absolute paths (including drive letters)
  if (/^[A-Za-z]:[\\\/]/.test(specifier)) {
    return nextResolve(pathToFileURL(specifier).href, context);
  }
  
  // Handle protocol-like patterns that might be Windows paths
  if (/^[A-Za-z]:/.test(specifier) && !specifier.includes('://')) {
    return nextResolve(pathToFileURL(specifier).href, context);
  }
  
  // Handle normal resolution
  return nextResolve(specifier, context);
}