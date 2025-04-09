'use client'
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Church } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { authService } from "@/services/auth-service";
import { toast } from "@/hooks/use-toast";

export default function LoginPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // Verificar se o usuário já está autenticado ao carregar a página
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const isAuthenticated = await authService.isAuthenticated();
                if (isAuthenticated) {
                    // Obter o parâmetro de data, se existir
                    const dateParam = searchParams.get('date');
                    const redirectPath = dateParam 
                        ? `/manage/agenda?date=${dateParam}`
                        : '/manage/agenda';
                        
                    router.push(redirectPath);
                }
            } catch (error) {
                console.error("Auth check error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuthStatus();
    }, [router, searchParams]);

    const onSubmitFunction = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password) {
            setErrorMessage("Por favor, preencha todos os campos.");
            return;
        }
        
        setIsLoading(true);
        setErrorMessage("");
        
        try {
            const success = await authService.login(email, password);
            
            if (success) {
                toast({
                    title: "Login realizado!",
                    description: "Você foi autenticado com sucesso.",
                });
                
                // Check if we have a date parameter to preserve during redirection
                const dateParam = searchParams.get('date');
                const redirectPath = dateParam 
                    ? `/manage/agenda?date=${dateParam}`
                    : '/manage/agenda';
                    
                router.push(redirectPath);
            } else {
                setErrorMessage("Credenciais inválidas. Por favor, tente novamente.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Erro ao realizar login. Por favor, tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
            <div className="w-full max-w-sm">
                <div className={"flex flex-col gap-6"}>
                    {isLoading ? (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <form onSubmit={onSubmitFunction}>
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <a
                                        href="/"
                                        className="flex flex-col items-center gap-2 font-medium"
                                    >
                                        <div className="flex h-8 w-8 items-center justify-center rounded-md">
                                            <Church className="size-6" />
                                        </div>
                                        <span className="sr-only">Igreja Adventista do Sétimo Dia Campina Verde</span>
                                    </a>
                                    <h1 className="text-xl font-bold">Sistema de gestão Campina Verde</h1>
                                    <div className="text-center text-sm">
                                        Não possui um acesso?{" "}
                                        <a href="https://wa.me/5511946744553?text=Olá!%20Gostaria%20de%20solicitar%20o%20acesso%20para%20gerenciar%20o%20ministério.%20Ainda%20não%20possuo%20um%20login%20ou%20credenciais.%20Poderia%20me%20orientar%20sobre%20os%20próximos%20passos?" className="underline underline-offset-4">
                                            Cadastre-se
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-6">
                                    {errorMessage && (
                                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                                            {errorMessage}
                                        </div>
                                    )}
                                    
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@exemplo.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="password">Senha</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="**********"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? "Entrando..." : "Entrar"}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
                        O acesso ao sistema deve ser solicitado ao gestor ou diretor do grupo para aprovação prévia.
                    </div>
                </div>
            </div>
        </div>
    );
}
