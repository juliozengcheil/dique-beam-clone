import { isCharacterALetter } from '../lib/text'
import Image from 'next/image'
import * as React from 'react'

export function Avatar({ size = 'md', name, src }) {
  const initial = name.charAt(0).toLocaleLowerCase()

  return (
    <div className="relative inline-flex flex-shrink-0 rounded-full">
      {src ? (
        <>
          <Image
            src={src}
            alt={name}
            layout="fixed"
            width={dimension[size]}
            height={dimension[size]}
            className="object-cover rounded-full"
          />
          <div className="absolute border border-[rgba(0,0,0,0.04)] rounded-full inset-0" />
        </>
      ) : (
        <div className="grid">
          <div className="flex col-start-1 col-end-1 row-start-1 row-end-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/avatar?name=${encodeURIComponent(name)}`}
              alt={name}
              width={dimension[size]}
              height={dimension[size]}
            />
          </div>
          {isCharacterALetter(initial) && (
            <div className="relative flex items-center justify-center col-start-1 col-end-1 row-start-1 row-end-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/images/letters/${initial}.svg`}
                className={initialSize[size]}
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
