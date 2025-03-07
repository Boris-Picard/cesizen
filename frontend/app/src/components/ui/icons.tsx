import type React from "react"
import { Loader2, Mail, Lock, User, Home, Menu, LogOut, Search, Activity, Info, UserCog, Settings, UserPlus, Edit, Trash2, Plus, LogIn, Eye, Phone, MapPin, AlertCircle, ArrowLeft, Shield, AlertTriangle, RefreshCw, CheckCircle } from 'lucide-react'

export const Icons = {
  logo: ({ className, ...props }: React.ComponentProps<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  ),
  google: ({ className, ...props }: React.ComponentProps<"svg">) => (
    <svg role="img" viewBox="0 0 24 24" className={className} {...props}>
      <path
        fill="currentColor"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  ),
  apple: ({ className, ...props }: React.ComponentProps<"svg">) => (
    <svg role="img" viewBox="0 0 24 24" className={className} {...props}>
      <path
        fill="currentColor"
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09z"
      />
    </svg>
  ),
  facebook: ({ className, ...props }: React.ComponentProps<"svg">) => (
    <svg role="img" viewBox="0 0 24 24" className={className} {...props}>
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  ),
  loader: Loader2,
  mail: Mail,
  lock: Lock,
  user: User,
  home: Home,
  info: Info,
  activity: Activity,
  userCog: UserCog,
  menu: Menu,
  logOut: LogOut,
  search: Search,
  settings: Settings,
  userplus: UserPlus,
  edit: Edit,
  trash: Trash2,
  plus: Plus,
  login: LogIn,
  eye: Eye,
  phone: Phone,
  mapPin: MapPin,
  alertCircle: AlertCircle,
  arrowLeft: ArrowLeft,
  shield: Shield,
  alertTriangle: AlertTriangle,
  refreshCw: RefreshCw,
  checkCircle: CheckCircle,
}

