const notes = [
    <>
        Don&apos;t expect a fast response — I&apos;m poor. Top to bottom this is a
        free application: built with free stuff, a fully open-source LLM available
        on the internet, hosted on a free platform. Response time is subject to the
        complexity of the input tokens.
    </>,
    <>
        No context engineering here. Short-term memory will be implemented by the
        time. Keep an eye on the site.
    </>,
    <>
        Feedback is always welcome — not personal 😶, only context to this project:{' '}
        <a
            href="mailto:bhuinjohn@gmail.com"
            className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-2 transition hover:text-zinc-900 hover:decoration-zinc-900"
        >
            bhuinjohn@gmail.com
        </a>
        .
    </>,
    <>Thanks for visiting. Please write your query before you sleep.</>,
]

export default function InfoNotes() {
    return (
        // Anchored to both edges of the left gutter, so it spans the whole free
        // space beside the centred column without moving the prompt bar; stacks
        // underneath on anything narrower.
        <aside className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50/70 p-4 xl:absolute xl:top-16 xl:right-[calc(100%_+_2.5rem)] xl:left-[calc(50%_-_50vw_+_2rem)] xl:mt-0 xl:max-w-sm xl:p-5">
            <h2 className="text-[11px] font-semibold tracking-wide text-zinc-400 uppercase">
                Good to know
            </h2>

            <ul className="mt-3 space-y-3 text-xs leading-relaxed text-zinc-500">
                {notes.map((note, i) => (
                    <li key={i} className="flex gap-2">
                        <span aria-hidden className="text-zinc-300">
                            •
                        </span>
                        <span>{note}</span>
                    </li>
                ))}
            </ul>
        </aside>
    )
}
