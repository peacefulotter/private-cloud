import { createServerAction$, createServerData$, redirect } from 'solid-start/server';
import { useRouteData } from 'solid-start';

import { getUser, logout } from '~/db/session';

export const routeData = () => {
	return createServerData$(async (_, { request }) => {
		const user = await getUser(request);
		if ( !user )
			throw redirect("/login");
		return user;
	});
}

export default function Home() {
	const user = useRouteData<typeof routeData>();
	const [, { Form }] = createServerAction$((f: FormData, { request }) =>
		logout(request)
	);

	return (
		<main class="w-full h-full p-4 space-y-2">
			<nav>
				<h1 class="font-bold text-3xl">Hello {user()?.username}</h1>
				<Form>
					<button name="logout" type="submit">Logout</button>
				</Form>
			</nav>
		</main>
	);
}
