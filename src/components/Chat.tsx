import { useEffect, useRef, useState } from "react"
import { io, Socket } from "socket.io-client"
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import clsx from "clsx"
import { useAuth } from "../context/AuthContext"

interface Message {
  _id: string
  username: string
  content: string
  createdAt: string
}

export const Chat = () => {
  const { state } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const socketRef = useRef<Socket | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!state.isAuth) return

    const socket = io(import.meta.env.VITE_API_URL || "http://localhost:4000", {
      auth: {
        token: localStorage.getItem("TOKEN_BEARS"),
      },
    })

    socketRef.current = socket

    socket.on("chatHistory", (msgs: Message[]) => {
      setMessages(msgs)
    })

    socket.on("chatMessage", (msg: Message) => {
      setMessages((prev) => [...prev, msg])
    })

    socket.on("connect_error", (err) => {
      console.error("Error de conexión:", err.message)
    })

    return () => {
      socket.disconnect()
    }
  }, [state.isAuth])

  // Autoscroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages])

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current) return
    socketRef.current.emit("chatMessage", input)
    setInput("")
  }

  return (
    <div className="bg-[#18181b]/90 backdrop-blur-md text-white rounded-2xl max-w-xl mx-auto p-5 shadow-lg border border-white/10 flex flex-col max-h-[600px]">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6" />
        </svg>
        Chat en vivo
      </h2>

      {state.isAuth ? (
        <>
          {/* Contenedor con scroll para mensajes */}
          <div className="flex-1 overflow-y-auto space-y-2 mb-4 pr-2 custom-scroll">
            {messages.map((msg) => {
              const isOwnMessage = msg.username === localStorage.getItem("USERNAME_BEARS")
              return (
                <div
                  key={msg._id}
                  className={clsx(
                    "flex flex-col p-3 rounded-xl break-words",
                    isOwnMessage
                      ? "bg-yellow-600 text-white self-end ml-auto rounded-br-none"
                      : "bg-gray-800 text-gray-200 self-start mr-auto rounded-bl-none"
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm truncate max-w-[70%]">{msg.username}</span>
                    <span className="text-[10px] text-gray-400 ml-2 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="text-sm leading-tight whitespace-pre-wrap">{msg.content}</div>
                </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input y botón */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex gap-2"
          >
            <input
              className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              maxLength={500}
              spellCheck={false}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-semibold transition flex items-center justify-center"
            >
              <PaperAirplaneIcon className="w-5 h-5 text-black" />
            </button>
          </form>
        </>
      ) : (
        <p className="text-yellow-400 text-center mt-auto">Debes iniciar sesión para enviar mensajes</p>
      )}
    </div>
  )
}
